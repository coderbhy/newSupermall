<template>
  <div
    class="goods-list-item"
    @click="routeToDetail"
  >
    <img
      :src="showImg"
      @load="imgLoad"
    >
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="cfav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imgLoad () {
      // console.log('图片已加载完成');
      // 在这里图片加载完成后，我们要用到全局事件总线
      // 触发 scroll 的 refresh 函数用以重新计算可滚动区域的高度
      this.$bus.$emit('itemImgLoad')
    },
    routeToDetail () {
      this.$router.push(`/detail/${this.goodsItem.iid}`)
    }
  },
  computed: {
    showImg () {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  width: 48%;
  text-align: center;
  font-size: 14px;
  padding-bottom: 40px;
  position: relative;
}

.goods-list-item img {
  border-radius: 10px;
  width: 100%;
  vertical-align: middle;
}

.goods-list-item .goods-info {
  position: absolute;
  width: 100%;
  bottom: 4px;
  left: 0;
  right: 0;
}

.goods-list-item .goods-info > p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.goods-list-item .goods-info .price {
  color: var(--color-high-text);
}

.goods-list-item .goods-info .cfav::before {
  content: "收藏:";
}
</style>
