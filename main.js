import { createSSRApp } from "vue";
import App from "./App.vue";
import { createStorage } from "@/uni_modules/suixin-uni-local-storage";
export function createApp() {
  const app = createSSRApp(App);
  app.use(createStorage());
  return {
    app
  }
}
