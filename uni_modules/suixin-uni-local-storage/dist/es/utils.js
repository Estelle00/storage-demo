import { getCurrentInstance, inject } from "vue";
const storageSymbol = Symbol("storage");
let activeStorage = null;
function setActive(storage) {
  activeStorage = storage;
}
function getActive() {
  return getCurrentInstance() && inject(storageSymbol) || activeStorage;
}
export { getActive, setActive, storageSymbol };
