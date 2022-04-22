import type { Storage } from "./types";
export declare const storageSymbol: unique symbol;
export declare function setActive(storage: Storage): void;
export declare function getActive(): Storage;
