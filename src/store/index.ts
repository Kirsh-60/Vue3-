import { defineStore } from "pinia";
export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      account: "测试",
      phoneInfo: {},
    };
  },
  getters: {},
  actions: {},
});
