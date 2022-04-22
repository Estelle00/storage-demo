import { markRaw } from "vue";
import type { App } from "vue";
import type { Storage, StorageOptions, StoragePlugin } from "./types";
import {setActive, storageSymbol} from "./utils";
import initStatePlugin from "./plugins/initStatePlugin";
export function createStorage(options: Partial<StorageOptions> = {}) {
  const opt: StorageOptions = Object.assign({},{
    namespace: "__ls__",
    name: "ls",
  }, options);
  // const scope = effectScope(true);
  // const state = scope.run<StateReactive>(() =>
  //   reactive<StateData>({})
  // )!
  let _p: Storage["_p"] = [];
  let toBeInstalled: StoragePlugin[] = [];
  const storage: Storage = markRaw({
    install(app: App) {
      setActive(storage);
      storage._a = app;
      app.provide(storageSymbol, storage);
      app.config.globalProperties[opt.name] = storage;
      toBeInstalled.forEach(plugin => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
      // 插件添加
    },
    _p,
    // @ts-ignore
    _a: null,
    $options: opt,
    $s: new Map()
  });
  storage.use(initStatePlugin);
  return storage;
}
