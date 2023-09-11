<template>
    <view>
        <view :style="{ height: height + 'rpx' }" class="swiper-container" @touchstart="touchStart" @touchend="touchEnd">
            <view class="swiper-item" v-for="(item, index) in list" :key="index"
                :style="{ transform: styleList[index].transform, zIndex: styleList[index].zIndex, opacity: styleList[index].opacity, display: styleList[index].display }">
                <view class="wrap" @click="itemClick(index)">
                    <image class="image" :src="item.image"></image>
                </view>
            </view>
        </view>
        <view class="indication">
            <block v-for="(item, index) in list" :key="index">
                <view class="spot" :class="index == 1 ? 'active' : ''"></view>
            </block>
        </view>
    </view>
    <tabber/>
</template>

<script>
export default {
    props: {
        /**
         * 图片url列表
         */
        // list: {
        // 	type: Array,
        // 	default: []
        // },
        /**
         * swiper高度
         */
        height: {
            type: Number,
            default: 690
        }
    },
    data() {
        return {
            /**
             * 开始触摸点坐标
             */
            start: {
                x: 0,
                y: 0
            },
            /**
             * 每个item样式列表
             */
            list: [
                {
                    image: 'https://xcxsite.vjifen.com/v/wuxing/pinpai-banner1.png'
                }, {
                    image: 'https://xcxsite.vjifen.com/v/wuxing/pinpai-banner2.png'
                }, {
                    image: 'https://xcxsite.vjifen.com/v/wuxing/pinpai-banner3.png'
                }
            ],
            styleList: [],
            timer: null
        };
    },
    async created() {
        await this.getIMG()
        // await this.aotoChange()
    },
    methods: {
        async getIMG() {
            // const requestPayload2 = {
            //     name: 'swiper',
            //     current: 1,
            //     size: 10
            // }
            // const retult = await this.$request('/benefit/wx/my/page', this.$PostHeader,
            //     requestPayload2, 'post')
            // if (retult.code !== 200) return
            // if (retult.data.records) {
            //     let arr = retult.data.records[0].photoUrl.split(',')
            //     this.list = arr.map(v => `${this.$imageUrl}${v}`);
            // }
            this.list.forEach((item, index) => {
                this.styleList.push(this.addStyle(index))
            })
        },
        aotoChange() {
            this.timer = setInterval(() => {
                var newStyleList = JSON.parse(JSON.stringify(this.styleList))
                var last = [newStyleList.pop()]
                newStyleList = last.concat(newStyleList)
                this.styleList = newStyleList
            }, 3000)
        },
        /**
         * 计算每个item样式
         * @param {Object} idx
         */
        addStyle(idx) {
            const len = this.list.length;
            if (idx > len / 2) {
                //这里是数组后一半的item放在左边,平移位置由远到近，例如共6个，后2个处理在这里
                var left = len - idx
                return {
                    transform: 'scale(' + (1 - left / 5) + ') translate(-' + (left * 18) + '%,0px)',
                    zIndex: 99 - left,
                    opacity: 0.8 / left,
                    display: idx == len - 1 ? "block" : "none"
                }
            } else {
                //这里是数组前一半item放在右边，平移位置由近到远，例如共6个，前4个处理在这里，这里第一个元素始终放在中间位置
                return {
                    transform: 'scale(' + (1 - idx / 5) + ') translate(' + (idx * 18) + '%,0px)',
                    zIndex: 99 - idx,
                    opacity: 0.8 / (idx === 0 ? 0.8 : idx),
                    display: idx > 1 ? "none" : "block"
                }
            }
        },
        /**
         * 触摸开始
         * @param {Object} e
         */
        touchStart(e) {
            this.start.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
            this.start.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
            clearInterval(this.timer)
        },
        /**
         * 触摸结束
         * @param {Object} e
         */
        touchEnd(e) {
            var newStyleList = JSON.parse(JSON.stringify(this.styleList))
            let tx = e.changedTouches[0].pageX - this.start.x
            let ty = e.changedTouches[0].pageY - this.start.y
            if (Math.abs(tx) > Math.abs(ty)) {
                //左右方向滑动
                if (tx < 0) {
                    // 向左滑动
                    var last = [newStyleList.pop()]
                    newStyleList = last.concat(newStyleList)
                } else if (tx > 0) {
                    // 向右滑动
                    newStyleList.push(newStyleList[0])
                    newStyleList.splice(0, 1)
                }
            } else {
                //这里就不处理上下方向的事件了，有此需求的同仁可以在这里写逻辑
                //上下方向滑动
                if (ty < 0) {
                    // 向上滑动
                } else if (ty > 0) {
                    // 向下滑动
                }
            }
            this.styleList = newStyleList
            this.aotoChange()
        },
        /**
         * 当前item点击返回索引下标
         * @param {Object} idx
         */
        itemClick(idx) {
            this.$emit('click', idx);
        }
    }
}
</script>

<style lang="scss">
.swiper-container {
    box-sizing: border-box;
    height: 690rpx;
    width: 100%;
    overflow: hidden;
    position: relative;

    .swiper-item {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .5s;
        padding: 2rpx 0;

        .wrap {
            height: 100%;
            width: 610rpx;
            margin: 0 auto;

            .image {
                height: 100%;
                width: 100%;
                border-radius: 16rpx;
                box-shadow: 0 0 10rpx #333; //加阴影的话去掉注释即可
            }
        }
    }
}

/* 轮播指示点 start*/
.indication {
    z-index: 9999;
    width: 100%;
    height: 36rpx;
    position: absolute;
    padding-right: 48rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.spot {
    background-color: #FF483C;
    opacity: 0.4;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -53rpx;
    margin: 0 8rpx !important;
    position: relative;
}

.spot.active {
    opacity: 1;
    width: 24rpx;
    // background: url('../../static/Stroke.png') no-repeat;
    background-size: contain;
    margin-top: 2rpx !important;
}
</style>
