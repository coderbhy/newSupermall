<template>
  <div class="detail-bottom-bar">
    <div class="left-part">
      <div>
        <i class="iconfont icon-kefu"></i>
        <div>客服</div>
      </div>
      <div>
        <i class="iconfont icon-dianpu"></i>
        <div>店铺</div>
      </div>
      <div>
        <i class="iconfont icon-shoucang1"></i>
        <div>收藏</div>
      </div>
    </div>
    <div class="right-part">
      <div>加入购物车</div>
      <div>购买</div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.detail-bottom-bar {
  background: #fff;
  height: 49px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}

.left-part {
  width: 55%;
  display: flex;
}

.left-part > div {
  flex: 1;
  padding-top: 3px;
}

.left-part > div i {
  font-size: 22px;
}

.right-part {
  width: 45%;
  display: flex;
  line-height: 49px;
}

.right-part > div {
  flex: 1;
}

.right-part > div:first-child {
  background: var(--color-tint);
  height: 100%;
}

.right-part > div:last-child {
  background: orange;
  height: 100%;
}
</style>
