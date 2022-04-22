import type { Storage } from "./types";
import {getCurrentInstance, inject} from "vue";

export const storageSymbol = Symbol("storage");
let activeStorage: Storage | null = null;

export function setActive(storage: Storage) {
  activeStorage = storage;
}

export function getActive(): Storage {
  return (getCurrentInstance() && inject(storageSymbol)) || activeStorage!;
}
