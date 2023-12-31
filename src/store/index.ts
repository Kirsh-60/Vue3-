import { defineStore } from "pinia";
import { getKoulingApi } from "@/api/common";
export const useAccountStore = defineStore("account", {
  state: () => {
    return {
      counter: 1 as number,
      phoneInfo: {} as object,
      msg: "hello" as string,
      list: [
        {
          name: "iphone",
          price: 2000,
          count: 1,
        },
        {
          name: "huawei",
          price: 1000,
          count: 1,
        },
      ] as any,
      kouling: "" as string,
      timuList: [] as any,
    };
  },
  getters: {
    getSum: (state) => {
      return state.list.reduce((pre: any, item: any) => {
        return pre + item.price * item.count;
      }, 0);
    },
  },
  // 同步异步都行
  actions: {
    async getKouling() {
      const t_data = "?k=l663y1zhgt3w2";
      const result: any = await getKoulingApi(t_data);
      const { status, text } = result;
      if (status === "ok") {
        this.kouling = text; //actions内部可以用this指向state
      }
    },
  },
});
