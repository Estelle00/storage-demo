"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var vue = require("vue");
var utils = require("./utils.js");
var initStatePlugin = require("./plugins/initStatePlugin.js");
function createStorage(options = {}) {
  const opt = Object.assign({}, {
    namespace: "__ls__",
    name: "ls"
  }, options);
  let _p = [];
  let toBeInstalled = [];
  const storage = vue.markRaw({
    install(app) {
      utils.setActive(storage);
      storage._a = app;
      app.provide(utils.storageSymbol, storage);
      app.config.globalProperties[opt.name] = storage;
      toBeInstalled.forEach((plugin) => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    $options: opt,
    $s: /* @__PURE__ */ new Map()
  });
  storage.use(initStatePlugin);
  return storage;
}
exports.createStorage = createStorage;
