import type { App, UnwrapNestedRefs } from "vue";

export type Fn = (...arg: unknown[]) => void;
export type StorageOptions = {
  namespace: string;
  name: string;
};
export type SaveData = {
  value: any;
  time?: number;
};
export interface StoragePluginContext {
  app: App;
  id: string;
  storage: Storage;
}
export interface StoragePlugin {
  (context: StoragePluginContext): void;
}
export interface Store {
  // store内容
  state: any;
  time?: number;
  updateTime: number;
  _s: Storage;
  $id: string;
  // 设置store有效时间，不设置永久有效；每次更新数据会重新倒计时
  setEffectiveTime(time?: number): void;
  // 移除store的有效时间
  removeEffectiveTime(): void;
}
export type ReactiveStore = UnwrapNestedRefs<Store>;
export interface Storage {
  install: (app: App) => void;
  $options: StorageOptions;
  // 使用当前storage插件
  use(plugin: StoragePlugin): Storage;
  $s: Map<string, Store>;
  _a: App;
  _p: StoragePlugin[];
}
