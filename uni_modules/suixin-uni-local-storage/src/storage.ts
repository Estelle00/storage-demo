import { getActive } from "./utils";
import { effectScope, reactive, watch, watchEffect } from "vue";
import type { Storage, Store } from "./types";
import { ReactiveStore } from "./types";
function createSetupStore(id: string, storage: Storage): Store {
  const scope = effectScope();
  const key = storage.$options.namespace + id;
  const {
    value,
    time,
    updateTime = Date.now(),
  } = uni.getStorageSync(key) || {};
  function setEffectiveTime(time: number) {
    store.time = time;
    setUpdateTimeToNow();
  }
  function removeEffectiveTime() {
    store.time = undefined;
  }
  function setUpdateTimeToNow() {
    store.updateTime = Date.now();
  }
  const store: ReactiveStore = reactive({
    state: value,
    time,
    updateTime,
    _s: storage,
    $id: id,
    setEffectiveTime,
    removeEffectiveTime,
  });
  storage.$s.set(id, store);

  watch(
    () => store.state,
    (val) => {
      if (val !== undefined) {
        uni.setStorageSync(key, {
          value: val,
          time: store.time,
          updateTime: Date.now(),
        });
      } else {
        uni.removeStorageSync(key);
      }
      setUpdateTimeToNow();
    }
  );
  let timer: number | undefined;
  function clearTime() {
    if (timer) clearTimeout(timer);
    timer = undefined;
  }
  function remove() {
    clearTime();
    store.state = undefined;
  }
  // 添加有效时间处理
  watchEffect(() => {
    if (store.time) {
      const effectiveTime = store.updateTime + store.time * 1000 - Date.now();
      if (effectiveTime > -1) {
        clearTime();
        timer = setTimeout(remove, effectiveTime);
      } else {
        remove();
      }
    }
  });
  storage._p.forEach((plugin) => {
    scope.run(() => plugin({ app: storage._a, id, storage }));
  });
  return store;
}

/**
 *
 * @param name 存储数据key
 * @return Store
 *
 */
export function useStore(name: string) {
  const storage = getActive();
  let store = storage.$s.get(name);
  if (!store) {
    store = createSetupStore(name, storage);
  }
  return store;
}
