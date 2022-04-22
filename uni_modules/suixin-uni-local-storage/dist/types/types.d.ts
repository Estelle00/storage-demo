import type { App, UnwrapNestedRefs } from "vue";
export declare type Fn = (...arg: unknown[]) => void;
export declare type StorageOptions = {
    namespace: string;
    name: string;
};
export declare type SaveData = {
    value: any;
    time?: number;
};
export declare type StoreStateReactive = UnwrapNestedRefs<SaveData>;
export interface StoragePluginContext {
    app: App;
    id: string;
    storage: Storage;
}
export interface StoragePlugin {
    (context: StoragePluginContext): void;
}
export interface Store {
    state: StoreStateReactive;
    _s: Storage;
    $id: string;
    update(val: any, time?: number): void;
    remove(): void;
}
export declare type ReactiveStore = UnwrapNestedRefs<Store>;
export interface Storage {
    install: (app: App) => void;
    $options: StorageOptions;
    use(plugin: StoragePlugin): Storage;
    $s: Map<string, Store>;
    _a: App;
    _p: StoragePlugin[];
}
