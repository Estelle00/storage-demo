<template>
	<view>
		<view class="button-sp-area">
			<button type="primary" plain="true" @click="setData()">设置数据</button>
		</view>
   <view class="button-sp-area">
    	<button type="primary" plain="true" @click="getData">获取数据</button>
    </view>
		<view class="button-sp-area">
			<button type="primary" plain="true" @click="changeData">变更数据</button>
		</view>
    <view>{{ store.state }}</view>
    <view>{{ resultStr }}</view>
	</view>
</template>
<script setup>
  import { useStore } from "@/uni_modules/suixin-uni-local-storage";
  import { ref } from "vue";
  const store = useStore("foo");
  const resultStr = ref("");
  store.setEffectiveTime(10);
  const defaultData = {
    a: 1,
    b: 2
  }
  function showTips(msg, data) {
    resultStr.value = msg + JSON.stringify(data);
  }

  function setData(data = defaultData) {
    store.state = data;
    showTips("设置数据：", data);
  }
  function getData() {
    const d = store.state;
    showTips("获取数据：", d);
  }
   function changeData() {
     store.state = Math.random()
    // const d = { ...defaultData, b: Math.random() };
    // setData(d);
  }
</script>
// export default {
//   methods: {
//     addListener() {
//       this.resultStr = "添加数据监听";
//       this.$ls.on("foo", this.callback)
//     },
//     addOnceListener() {
//       this.$ls.once("foo", this.callback)
//     },
//     removeListener() {
//       this.$ls.off("foo", this.callback)
//     },
//     callback(newData, oldData) {
//       console.log(newData);
//       console.log(oldData);
//       uni.showToast({
//         icon: "none",
//         title: "数据变更了"
//       })
//     },
//     getData() {
//       const d = this.$ls.get("foo");
//       this.showTips("获取数据：", d);
//     },
//     changeData() {
//       const d = { ...this.defaultData, b: Math.random() };
//       this.setData(d);
//     }
//   }
// }
<style lang="scss" scoped>
  .button-sp-area {
    padding: 30rpx;
  }
</style>
