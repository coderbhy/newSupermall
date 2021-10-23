<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#tab-bar {
  display: flex;
  /* 底部栏（选项卡）高度一般为49px */
  height: 49px;
  background: #f2f2f2;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /* 首页的选项卡会覆盖底部 tabbar，因此我们给 tabbar 加一个 z-index
  使其大于选项卡的 z-index */
  z-index: 200;
}
</style>
