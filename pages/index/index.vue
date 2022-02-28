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
		<view class="button-sp-area">
			<button type="primary" plain="true" @click="addListener">监听数据</button>
		</view>
		<view class="button-sp-area">
			<button type="primary" plain="true" @click="addOnceListener">监听一次数据变化</button>
		</view>
		<view class="button-sp-area">
			<button type="primary" plain="true" @click="removeListener">取消监听</button>
		</view>
    <view>{{ resultStr }}</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      resultStr: "",
      defaultData: {
        a: 1,
        b: 2
      }
    }
  },
  methods: {
    showTips(msg, data) {
      this.resultStr = msg + JSON.stringify(data);
    },
    addListener() {
      this.resultStr = "添加数据监听";
      this.$ls.on("foo", this.callback)
    },
    addOnceListener() {
      this.$ls.once("foo", this.callback)
    },
    removeListener() {
      this.$ls.off("foo", this.callback)
    },
    callback(newData, oldData) {
      console.log(newData);
      console.log(oldData);
      uni.showToast({
        icon: "none",
        title: "数据变更了"
      })
    },
    setData(data = this.defaultData) {
      this.$ls.set("foo", data);
      this.showTips("设置数据：", data);
    },
    getData() {
      const d = this.$ls.get("foo");
      this.showTips("获取数据：", d);
    },
    changeData() {
      const d = { ...this.defaultData, b: Math.random() };
      this.setData(d);
    }
  }
}
</script>
<style lang="scss" scoped>
  .button-sp-area {
    padding: 30rpx;
  }
</style>