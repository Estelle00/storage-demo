import * as Event from "./event.js";
import type {Data, SaveData, StorageOptions} from "../types";
import  { reactive, watch, type App } from "vue";
function type(obj: unknown) {
	return {}.toString
		.call(obj)
		.slice(8, -1)
		.toLowerCase();
}
function isEqual(a: any, b: any) {
	if (a === b) {
		return a !== 0 || 1 / a === 1 / b;
	}
	if (a === null || b === null) {
		return a === b;
	}
	const className = type(a);
	if (className !== type(b)) {
		return false;
	}
	if (className === "object") {
		const propsA = Object.getOwnPropertyNames(a);
		const propsB = Object.getOwnPropertyNames(b);
		if (propsA.length !== propsB.length) {
			return false;
		}
		for (let i = 0; i < propsA.length; i++) {
			const propsName = propsA[i];
			if (!isEqual(a[propsName], b[propsName])) {
				return false;
			}
		}
		return true;
	}
	if (className === "array") {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) {
				return false
			}
		}
		return true;
	}
}

function getVersionNumber(version: string) {
	return Number(version.replace(/\./, ""));
}
function compareVersion(version: string, ver: string) {
	return getVersionNumber(version) - getVersionNumber(ver);
}
function getData(namespace: string) {
	const {keys} = uni.getStorageInfoSync();
	return keys.reduce((obj: Record<string, unknown>, key: string) => {
		if(new RegExp("^" + namespace).test(key)) {
			obj[key.replace(namespace, "")] = uni.getStorageSync(key);
		}
		return obj;
	}, {}) as Data
}
function isObject(data: any) {
	return data !== null && typeof data === "object";
}
export default class Storage {
	options: StorageOptions = {
    version: "0.0.1",
    namespace: "__ls__",
    name: "ls",
  };
  data: Record<string, SaveData>
	constructor(options: Partial<StorageOptions> = {}) {
		this.options = {
			version: "0.0.1",
			namespace: "__ls__",
      name: "ls",
			...options
		};
		Object.keys(Event).forEach(key => {
			this[`${key}`] = Event[key];
		})
		this.data = reactive(getData(this.options.namespace));
	}
  install(app: App) {
    const { name } = this.options;
    // #ifdef VUE3
    app.config.globalProperties[`${name}`] = this;
    // #endif
    // #ifdef VUE2
    // @ts-ignore
    app.prototype[`${name}`] = this;
    // #endif
  }
	reactive(data: Data) {
		const { namespace } = this.options;
		const self = this;
		if (!isObject(data)) {
			return data;
		}
		return new Proxy(data, {
			get(target, key, receiver) {
				// 此处只监听一层数据变化
				return Reflect.get(target, key, receiver);
				// return isObject(result) ? self.reactive(result) : result;
			},
			set(target, key: string, newData, receiver) {
				self.effective(data[key], newData, key);
				return Reflect.set(target, key, newData, receiver);
			},
			deleteProperty(target, key: string) {
				uni.removeStorageSync(namespace + key);
				return Reflect.deleteProperty(target, key);
			}
		})
	}
	effective(oldData: unknown, data: unknown, key: string) {
		const { namespace } = this.options;
		if (!oldData || !isEqual(oldData?.value, data?.value)) {
			uni.setStorageSync(namespace + key, data);
			this.emit(key, data?.value || null, oldData?.value);
		}
	}
	get(key: string, ver = "0.0.1") {
		const {value, version, time } = this.data[key] || {};
		if (value && version && compareVersion(version, ver) > -1) {
			if (time && time < Date.now()) {
				this.remove(key);
				return undefined;
			}
			return value;
		}
		return undefined;
	}
	getAll(ver = "0.0.1") {
		return Object.keys(this.data).reduce((obj, key) => {
			obj[key] = this.get(key, ver);
			return obj;
		}, {})
	}
	set(key, value, expire = null) {
		let time = null;
		if (expire) {
			time = Date.now() + expire * 1000;
		}
		this.data[key] = {
			value,
			version: this.options.version,
			time
		}
	}
	remove(key) {
		const found = key in this.data;
		if (found) {
			delete this.data[key];
			return true;
		}
		return false;
	}
}

function init(options: StorageOptions) {
  const { name, namespace }: StorageOptions = Object.assign({},{
    version: "0.0.1",
    namespace: "__ls__",
    name: "ls",
  }, options);
  const data = reactive(getData(namespace));
  function install(app: App) {
    // #ifdef VUE3
    app.config.globalProperties[`${name}`] = init;
    // #endif
    // #ifdef VUE2
    // @ts-ignore
    app.prototype[`${name}`] = init;
    // #endif
  }
  return {
    install
  }
}
