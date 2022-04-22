import { getActive } from "./utils.js";
import { effectScope, reactive, watchEffect } from "vue";
function createSetupStore(id, storage) {
  const scope = effectScope();
  const store = reactive({
    state: void 0,
    $time: void 0,
    _s: storage,
    $id: id,
    update,
    remove
  });
  storage.$s.set(id, store);
  function update(val, expire) {
    store.$time = expire ? Date.now() + expire * 1e3 : void 0;
    store.state = val;
  }
  function remove() {
    store.state = void 0;
    store.$time = void 0;
  }
  storage._p.forEach((plugin) => {
    scope.run(() => {
      const { value, time } = plugin({
        app: storage._a,
        id,
        storage
      }) || {};
      if (value !== void 0) {
        store.state = value;
      }
      if (time !== void 0) {
        store.$time = time;
      }
    });
  });
  let timer;
  watchEffect(() => {
    if (store.$time) {
      const effectiveTime = store.$time - Date.now();
      if (effectiveTime > -1) {
        clearTimeout(timer);
        timer = setTimeout(remove, effectiveTime);
      } else {
        remove();
      }
    }
  });
  return store;
}
function useStore(name) {
  const storage = getActive();
  let store = storage.$s.get(name);
  if (!store) {
    store = createSetupStore(name, storage);
  }
  return store;
}
export { useStore };
