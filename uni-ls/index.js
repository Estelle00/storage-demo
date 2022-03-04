import Vue from "vue";
import { createStorage } from "@/uni_modules/suixin-uni-local-storage";
const storage = createStorage({
  version: process.env.versionName,
  namespace: "__ls__",
  name: "ls" // 可选 ==> this.$ls or  Vue.ls
});

// 此次导出可直接在JS中使用
export default storage;
