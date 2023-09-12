<template>
  <div style="font-size: 22px;color: brown;">引入Pinia</div>
  数据
  <h2>总价格<div style="font-size: 22px;color: green;">{{ store.getSum }}</div></h2>
  <div style="font-size: 18px;color: salmon;">{{ msg }}</div>
  <div style="font-size: 18px;color: darkgoldenrod;">{{ counter }}</div>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      手机：{{ item.name }},价格：{{ item.price }}
    </li>
  </ul>
  <button @click="addCount">数据++</button>
  <button @click="changeNum">数据+5</button>
  <button @click="storeNum">数据+10</button>
  <button @click="changeAll">全部替换</button>
  <button @click="reset">重置状态</button>
  <button @click="store.getKouling">获取口令api</button>

  <h1 style="font-size: 22px;color: brown;">口令</h1>
  {{ kouling }}
  <tabber />
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useAccountStore } from "@/store/index";
// 实例化
const store = useAccountStore();
const { counter, msg, list, kouling } = storeToRefs(store);

// 累加
// 第一种修改方法
function addCount() {
  counter.value++;
}
// 第二种修改方法 $patch
function changeNum() {
  store.list.push({ name: "vivo", price: 3000, count: 1 });
  store.$patch({
    counter: (store.counter += 5),
    list: store.list,
  });

}
// 第三种修改方法 $patch,修改复杂类型
function storeNum() {
  store.$patch((store) => {
    store.list.push({
      name: 'oppo',
      price: 5000,
      count: 1
    })
    store.counter = 1000
  });
}
// 第四种方法，$state 全部替换
function changeAll() {
  // 必须将全部替换
  store.$state = {
    counter: 1000,
    phoneInfo: '',
    msg: '咯咯哒',
    list: [{
      name: 'oppo',
      price: 5000,
      count: 1
    }],
    timuList: [],
    kouling: ''
  }
}
// 一键重置
function reset() {
  store.$reset()
}
// 监听整个仓库变化
store.$subscribe((mutation, state) => {
  console.log("mutation", mutation);
  console.log("state", state);
})
</script>
<style scoped lang="scss"></style>