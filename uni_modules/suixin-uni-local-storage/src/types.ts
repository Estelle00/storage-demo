import type {App, UnwrapNestedRefs} from "vue";

export type Fn = (...arg: unknown[]) => void;
export type StorageOptions = {
  namespace: string;
  name: string;
}
export type SaveData = {
  value: any,
  time?: number
}
export interface StoragePluginContext {
  app: App;
  id: string;
  storage: Storage;
}
export interface StoragePlugin {
  (context: StoragePluginContext): Partial<SaveData>;
}
export interface Store {
  state: any;
  $time?: number;
  _s: Storage;
  $id: string;
  update(val: any, time?: number): void;
  remove(): void;
}
export type ReactiveStore = UnwrapNestedRefs<Store>;
export interface Storage {
  install: (app: App) => void;
  $options: StorageOptions;
  use(plugin: StoragePlugin): Storage;
  $s: Map<string, Store>;
  _a: App;
  _p: StoragePlugin[]
}
