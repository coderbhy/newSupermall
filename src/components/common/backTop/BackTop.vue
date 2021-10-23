<template>
  <div class="back-top">
    <img src="~assets/img/common/back_top.svg">
  </div>
</template>

<script>
export default {
  methods: {
    // 不在组件内部进行监听，而是直接在组件上进行监听
    // backTop () {
    //   this.$emit('back-top')
    // }
  }
}
</script>

<style scoped>
.back-top {
  /* 基本所有页面回到顶部的按钮都是在右下角 */
  /* 因此我们可以统一设置样式 */
  /* 而不用在每个界面都单独去设置 */
  position: fixed;
  right: 10px;
  /* fixed 定位是根据浏览器窗口进行定位，而不是已经定位的父元素 */
  /* 因此这里设置 bottom 的值必须要大于底部 tabbar 的高度 */
  bottom: 59px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 5px 0;
}

.back-top > img {
  width: 30px;
  height: 30px;
}
</style>
