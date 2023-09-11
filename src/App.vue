<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
// 导入状态仓库
import { useAccountStore } from "@/store/index";
// 使普通数据变响应式的函数
import { storeToRefs } from "pinia";
// 实例化仓库
const store = useAccountStore();
// 解构并使数据具有响应式
const { phoneInfo } = storeToRefs(store);
onLaunch(() => {
  console.log("App Launch");
  uni.getSystemInfo({
    complete: (res) => {
      uni.setStorage({
        key: "userSystemInfo",
        data: res
      })
      phoneInfo.value = res
    }
  })
});
onShow(() => {
  console.log("App Show");
  uni.hideTabBar({
    animation: false
  })
});
onHide(() => {
  console.log("App Hide");
});

</script>
<style></style>
