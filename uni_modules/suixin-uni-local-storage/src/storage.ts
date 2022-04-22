import { getActive } from "./utils";
import {effectScope, reactive, watchEffect} from "vue";
import type { SaveData, Storage, Store } from "./types";
import {ReactiveStore} from "./types";
function createSetupStore(id: string, storage: Storage): Store {
  const scope = effectScope();
  const store: ReactiveStore = reactive({
    state: undefined,
    $time: undefined,
    _s: storage,
    $id: id,
    update,
    remove,
  })
  storage.$s.set(id, store);
  function update(val: any, expire?: number) {
    store.$time = expire ? Date.now() + expire * 1000 : undefined;
    store.state = val;
  }
  function remove() {
    store.state = undefined;
    store.$time = undefined;
  }
  storage._p.forEach(plugin => {
    scope.run(() => {
      const { value, time } = plugin({
        app: storage._a,
        id,
        storage
      }) || {};
      if (value !== undefined) {
        store.state = value;
      }
      if (time !== undefined) {
        store.$time = time;
      }
    })
  });

  // 添加有效时间处理
  let timer: number;
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
  })
  return store;
}
export function useStore(name: string) {
  // 1.判断storge是否有 get
  //2. 如果没有
  // 1) 初始化（挂载修改。删除、插件）
  //3. 返回store

  const storage = getActive();
  let store = storage.$s.get(name);
  if (!store) {
    store = createSetupStore(name, storage);
  }
  return store;
}
