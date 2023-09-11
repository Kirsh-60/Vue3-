<template>
  <!-- 底部导航 -->
  <view class="tabbar">
    <view class="tabbar-item" v-for="(item, index) in tabberMenu" :key="index"
      @click="tabbarChange(item.pagePath, index)">
      <image class="item-img" :src='item.selectedIconPath' v-if="current == index" mode="aspectFit"></image>
      <image class="item-img1" :src='item.iconPath' v-else  mode="aspectFit"></image>
      <view>{{ item.text }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch, } from 'vue';
onMounted(() => {
  uni.hideTabBar({
    animation: false
  })
})
const curPath = ref('')
watch(curPath, () => {
  const pages = getCurrentPages()
  curPath.value = pages.slice(-1)[0].route
}, {
  immediate: true,
  deep: true
})
const student = [
  {
    text: '首页', //首页
    iconPath: '/static/home.png', //未选中图标
    selectedIconPath: '/static/home-active.png', //选中图片
    pagePath: "/pages/index/index", //页面路径
  },
  {
    text: '品牌', //品牌
    iconPath: '/static/brand.png', //未选中图标
    selectedIconPath: '/static/brand-active.png', //选中图片
    pagePath: "/pages/brand/brand", //页面路径
  },
  {
    text: '', //扫一扫
    iconPath: '/static/scan.png',
    selectedIconPath: '/static/scan.png',
    pagePath: "/pages/scan/openscan",
  },
  {
    text: '商城', //商城
    iconPath: '/static/shop.png',
    selectedIconPath: '/static/shop-active.png',
    pagePath: "/pages/shop/shop",
  },
  {
    text: '我的', //我的
    iconPath: '/static/main.png',
    selectedIconPath: '/static/main-active.png',
    pagePath: "/pages/my/index",
  }
];
const tabberMenu = computed(() => {
  return student
})
const current = computed(() => tabberMenu.value?.findIndex(o => o.pagePath.includes(curPath.value)))
const tabbarChange = (path) => {
  uni.switchTab({
    url: path,
  })
}
</script>
<style scoped lang="scss">
image {
  width: 100%;
  height: 100%;
}

// .tabbarActive {
//   color: #79D5AD !important;
// }

.tabbar {
  position: fixed;
  bottom: 0rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200rpx;
  // padding: 0 30rpx;
  z-index: 99;
  font-size: 18rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #000000;
  background: url($wuxing + 'banner-bg.png') no-repeat;
  background-size: cover;
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  width: 100rpx;
  padding-top: 20rpx;
}

.tabbar-item:nth-child(3) {
  width: 98rpx;
  height: 115rpx;
  margin-top: -80rpx;

  image {
    width: 100%;
    height: 100%;
  }
}

/* 选中后 */
.item-img {
  width: 48rpx;
  height: 48rpx;
  /* border-radius: 50%; */
}

.item-img:nth-child(3) {
  width: 100rpx;
  height: 100rpx;
}

/* 选中前 */
.item-img1 {
  width: 48rpx;
  height: 48rpx;
}
</style>