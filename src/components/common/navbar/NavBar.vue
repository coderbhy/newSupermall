<template>
  <!-- 多个地方都会用到导航栏，用id就不太好，因此用class属性 -->
  <div class="nav-bar">
    <!-- 我们需要给导航栏进行布局，因此我们需要在 slot 外层添加一个div  -->
    <!-- 而不是直接给 slot 加样式，因为给 slot 加了样式，后面会被替换掉 -->
    <!-- slot 的样式就不会生效 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
/* 注意,我们不能直接把 navbar 的背景颜色定死
因为后面我们还会用到该 navbar,且背景颜色是不一样的 */
.nav-bar {
  display: flex;
  /* 导航栏高度一般为 44px */
  height: 44px;
  /* 使用 line-height = height 使文字垂直居中 */
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.nav-bar .left,
.nav-bar .right {
  width: 60px;
}

.nav-bar .center {
  flex: 1;
}
</style>
