import { createSSRApp } from "vue";
import App from "./App.vue";
import * as Pinia from 'pinia';
import tabber from "@/components/tabbar.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.component("tabber", tabber); // 2.调用app.component方法全局注册组件
  app.use(Pinia.createPinia());
  return {
    app,
    Pinia
  };
}
