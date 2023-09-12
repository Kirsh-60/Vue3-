<template>
  <view class="content">
    <button @click="updataInfo">获取用户信息</button>
    <view class="prize-info">
      <view class="photo" @click="updataInfo">
        <image :src="avatarUrl" class="avatar" mode="widthFix" @error="loadError"></image>
        <view class="block"></view>
        <view class="box-header">
          <text>{{ nickname }}</text>
        </view>
      </view>
    </view>
    <UserInfo ref="UserInfoRef" :nickname.sync="nickname" @updateNickName="updateNickName"
      @updateHeadImgUrl="updateHeadImgUrl" />
    <tabber />
    <privacy />
  </view>
</template >

<script setup lang = "ts" >
import privacy from '@/components/privacy.vue'
import UserInfo from '@/components/userInfo.vue'
import { ref, reactive } from "vue";
const nickname = ref<String>('微信用户')
const avatarUrl = ref<String>("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0")
const UserInfoRef = ref<any>(null)
const updataInfo = () => { //更新用户信息
  UserInfoRef.value.UserInfoState = true
  UserInfoRef.value.queryHeadList()
}
const updateNickName = (nickName: String) => {
  nickname.value = nickName
}
const updateHeadImgUrl = (HeadImgUrl: String) => {
  avatarUrl.value = HeadImgUrl
}
const loadError = () => {
    avatarUrl.value = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
}
</script>
 
<style lang="scss" scoped>
.prize-info {
  display: flex;
  justify-content: space-between;
  padding: 55rpx 40rpx;

  .info-left>text:first-child {
    font-size: 28rpx;
    letter-spacing: 0.1rem;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #000000;
  }

  .photo {
    display: flex;
    align-items: center;

    .avatar {
      width: 95rpx;
      height: 95rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .block {
      padding: 0 12rpx;
    }

    .box-header {
      text {
        display: block;
      }

      &>text:first-child {
        font-size: 28rpx;
        font-family: PingFang SC-Bold, PingFang SC;
        font-weight: bold;
        color: #000000;
        line-height: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200rpx;
      }

      &>text:last-child {
        display: inline;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 28rpx;
      }
    }
  }

  .info-left>text:last-child {
    padding-left: 10rpx;
    letter-spacing: 0.1rem;
    font-size: 36rpx;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #000000;
  }

  .info-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-right>text:first-child {
    font-size: 20rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #000000;
  }

  .info-right>image {
    width: 24rpx;
    height: 24rpx;
  }
}
</style>