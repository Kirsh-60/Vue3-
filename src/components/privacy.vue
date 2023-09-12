<template>
    <view class="privacy" v-if="showPrivacy">
        <view class="content">
            <view class="title">隐私保护指引</view>
            <view class="des">
                在使用当前小程序服务之前，请仔细阅读<text class="link" @tap="openPrivacyContract">{{ privacyContractName }}</text>。如你同意{{
                    privacyContractName }}，请点击“同意”开始使用。
            </view>
            <view class="btns">
                <button class="item reject" @tap="exitMiniProgram">拒绝</button>
                <button id="agree-btn" class="item agree" open-type="agreePrivacyAuthorization"
                    @agreeprivacyauthorization="handleAgreePrivacyAuthorization">同意</button>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from "vue"
import { onShow } from '@dcloudio/uni-app';

const showPrivacy = ref(false) //是否展示
const privacyContractName = ref('') //项目

onShow(() => {
    wx.getPrivacySetting({ //查询隐私授权情况
        success(res) {
            console.log(res);
            if (res.needAuthorization) { //true：没有授权，false：授权过
                privacyContractName.value = res.privacyContractName
                showPrivacy.value = true
            }
        }
    })
})
// 打开隐私协议页面
const openPrivacyContract = () => {
    wx.openPrivacyContract({//这个是微信API，是跳转到隐私协议H5的，一般容错规定一个fail就行了，因为成功就跳走了
        fail: () => {
            wx.showToast({
                title: '遇到错误',
                icon: 'error'
            })
        }
    })
}
// 拒绝隐私协议
const exitMiniProgram = () => {
    // 直接退出小程序（以实际需求为准）
    wx.exitMiniProgram()
}
// 同意隐私协议
const handleAgreePrivacyAuthorization = () => { //关闭授权弹窗
    showPrivacy.value = false
}
defineExpose({
    showPrivacy
})
</script>

<style lang="scss" scoped>
/* component/privacy/privacy.wxss */
.privacy {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    width: 632rpx;
    padding: 48rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16rpx;
}

.content .title {
    text-align: center;
    color: #333;
    font-weight: bold;
    font-size: 32rpx;
}

.content .des {
    font-size: 26rpx;
    color: #666;
    margin-top: 40rpx;
    text-align: justify;
    line-height: 1.6;
}

.content .des .link {
    color: #07c160;
    text-decoration: underline;
}

.btns {
    margin-top: 48rpx;
    display: flex;
}

.btns .item {
    justify-content: space-between;
    width: 244rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16rpx;
    box-sizing: border-box;
    border: none;
}

.btns .reject {
    background: #f4f4f5;
    color: #909399;
}

.btns .agree {
    background: #07c160;
    color: #fff;
}
</style>
