<template>
    <view class="mark" v-if="UserInfoState" catchtouchmove="move">
        <view class="dialog">
            <!-- 头部 -->
            <text>
                长城好酒 申请
            </text>
            <text>
                获取你的昵称
                、头像
            </text>
            <image class="avatar" :src="avatarUrl" @error="loadError"></image>
            <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="btn"></button>
            <text class="nicheng">
                昵称
            </text>
            <form bindsubmit="formsubmit" @submit="formSubmit" @reset="formReset">
                <input type="nickname" :value="nickname" class="weui-input" placeholder="请输入昵称" name="nickname"
                    maxlength="16" @nicknamereview="bindnicknamereview" @blur="onBlur" />
                <text class="xianzhi" selectable="false" space="false" decode="false">
                    限1-16个字符
                </text>
                <view class="toSet">
                    <button @click="onCancel">
                        取消
                    </button>
                    <button form-type="submit">
                        确定
                    </button>
                </view>
            </form>
        </view>
    </view>
</template>
<script setup>
import { updateUserMessage, userInfo } from '@/api/common'
import { ref, defineEmits } from 'vue'
const avatarUrl = ref("https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0")
const nickname = ref('')
const pass = ref(true)
const UserInfoState = ref(false)
// 2、定义发射给父组件的方法
const emits = defineEmits(['updateNickName'])
const bindnicknamereview = function (e) { //验证，过滤敏感词
    if (e.detail.pass) {
        //处理逻辑
        pass.value = true
    } else {
        pass.value = false
    }
}
const formSubmit = function (e) { //提交
    setTimeout(() => {
        if (pass.value && e.target.value.nickname != '') {
            nickname.value = e.target.value.nickname
            allok(nickname.value)
        } else {
            // eslint-disable-next-line no-undef
            uni.showToast({
                icon: 'none',
                title: "请填写昵称"
            })
        }
    }, 500);
}
const onCancel = () => { //取消
    pass.value = true
    UserInfoState.value = false
}
const allok = async (nickname_ed) => { //提交跳转
    console.log(nickname_ed, nickname.value);
    if (nickname_ed == '' || nickname.value == '') {
        // eslint-disable-next-line no-undef
        uni.showToast({
            icon: 'none',
            title: "请填写昵称"
        })
    } else {
        // 调接口 更新用户信息
        let data = {
            headImgUrl: avatarUrl.value || 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
            nickname: nickname_ed || '微信用户'
        }
        const { result } = await updateUserMessage(data)
        if (result.code != '0') { return }
        // eslint-disable-next-line no-undef
        uni.showToast({
            title: result.msg,
            icon: 'success'
        })
        emits('updateNickName', nickname_ed)
        emits('updateHeadImgUrl', avatarUrl.value)
        UserInfoState.value = false
    }
}

const queryHeadList = async () => {
    userInfo().then(res => {
        if (res.result.code == 0 && res.result.businessCode == 0) {
            nickname.value = res.reply.userInfo.nickName
            avatarUrl.value = res.reply.userInfo.headImgUrl || "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
        }
    })
}
const onChooseAvatar = (e) => { //修改用户头像
    console.log(e);
    if (e.detail) {
        avatarUrl.value = e.detail.avatarUrl
    }
}
const loadError = () => {
    avatarUrl.value = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
}
defineExpose({
    UserInfoState,
    nickname,
    queryHeadList
})
</script>
<style scoped lang="scss">
input {
    height: 80rpx;
    background-color: #F7F9FF;
}

.mark {
    // position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    .dialog {
        width: 100%;
        height: 850rpx;
        // height: 660rpx;
        position: fixed;
        bottom: 0px;
        background-color: #fff;
        left: 50%;
        transform: translate(-50%);
        border-top-right-radius: 30rpx;
        border-top-left-radius: 30rpx;
        text-align: center;
        transition: all 0.5s;
        padding: 0 50rpx;
        animation: animationName 0.5s;

        image {
            width: 160rpx;
            height: 160rpx;
            padding: 72rpx 0;
        }

        .btn {
            width: 160rpx;
            height: 160rpx;
            position: absolute;
            top: 224rpx;
            left: 50%;
            transform: translateX(-50%);
            background-color: transparent;
            border: none !important;
        }

        &>text:first-child {
            display: block;
            font-size: 28rpx;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #000000;
            line-height: 28rpx;
            padding: 72rpx 0 24rpx;
        }

        &>text:nth-child(2) {
            display: block;
            font-size: 36rpx;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #000000;
            line-height: 28rpx;
            // padding-bottom: 120rpx;
        }

        .nicheng {
            display: block;
            font-size: 36rpx;
            font-family: PingFang SC-Heavy, PingFang SC;
            font-weight: 800;
            color: #000000;
            line-height: 28rpx;
            padding-bottom: 22rpx;

        }

        .xianzhi {
            display: block;
            font-size: 20rpx;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #818EA5;
            line-height: 28rpx;
            padding-top: 15rpx;
        }

        .toSet {
            padding: 60rpx;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 70rpx 0 100rpx;

            &>button:first-child {
                width: 300rpx;
                height: 80rpx;
                background-color: #E3E4E4;
                color: #818EA5;
                font-size: 28rpx;
                font-family: PingFang SC-Heavy, PingFang SC;
                font-weight: 800;
                color: #818EA5;
                line-height: 80rpx;
            }

            &>button:last-child {
                width: 300rpx;
                height: 80rpx;
                background-color: #07C261;
                color: #fff;
                font-size: 28rpx;
                font-family: PingFang SC-Heavy, PingFang SC;
                font-weight: 800;
                line-height: 80rpx;
            }
        }

        .close {
            position: absolute;
            top: 32rpx;
            right: 40rpx;
            font-weight: bolder;
            font-size: 49rpx;
            color: #808080;
        }
    }
}

@keyframes animationName {
    0% {
        transform: translate(-50%, 100%);
    }

    100% {
        transform: translate(-50%);
    }
}
</style>