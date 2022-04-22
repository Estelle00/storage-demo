"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
const storageSymbol = Symbol("storage");
let activeStorage = null;
function setActive(storage) {
  activeStorage = storage;
}
function getActive() {
  return vue.getCurrentInstance() && vue.inject(storageSymbol) || activeStorage;
}
exports.getActive = getActive;
exports.setActive = setActive;
exports.storageSymbol = storageSymbol;
