import {StoragePluginContext} from "../types";
import {toRaw, watchPostEffect} from "vue";

export default function ({ storage, id }: StoragePluginContext) {
  const { $options } = storage;
  const key = $options.namespace + id;
  const store = storage.$s.get(id)!;
  const data = uni.getStorageSync(key) || {};
  watchPostEffect( () => {
    // if (data.value === toRaw(store.state) && data.time === store.$time) {
    //   return;
    // }
    console.log(1111);
    if (store.state === void 0) {
      uni.removeStorageSync(key);
    } else {
      uni.setStorageSync(key, {
        value: store.state,
        time: store.$time
      });
    }
  });
  return data;
}
