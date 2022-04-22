"use strict";
var vue = require("vue");
function initStatePlugin({ storage, id }) {
  const { $options } = storage;
  const key = $options.namespace + id;
  const store = storage.$s.get(id);
  const data = uni.getStorageSync(key) || {};
  vue.watchPostEffect(() => {
    console.log(1111);
    if (store.state === void 0) {
      uni.removeStorageSync(key);
    } else {
      uni.setStorageSync(key, {
        value: store.state,
        time: store.$time
      });
    }
  });
  return data;
}
module.exports = initStatePlugin;
