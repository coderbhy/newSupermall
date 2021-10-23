<template>
  <!-- 此处必须用v-if -->
  <!-- 若使用v-show则一定会渲染dom节点 -->
  <!-- 但是在首次加载时goods为一个空对象，并没有以下属性，会报错 -->
  <div
    class="base-info"
    v-if="GoodsIsShow"
  >
    <div class="goods-title">{{ goods.title }}</div>
    <div class="goods-price">
      <span class="goods-new-price">{{ goods.newPrice }}</span>
      <span class="goods-old-price">{{ goods.oldPrice }}</span>
      <span class="goods-discount">{{ goods.discount }}</span>
    </div>
    <div class="goods-number">
      <div class="goods-sell">{{ goods.columns[0] }}</div>
      <div class="goods-cfav">{{ goods.columns[1] }}</div>
      <div class="goods-send">{{ goods.services[0].name }}</div>
    </div>
    <div class="goods-other">
      <div
        class="goods-other-info"
        v-for="index in goods.services.length - 2"
        :key="index"
      >
        <img :src="goods.services[index + 1].icon">
        <span>{{ goods.services[index + 1].name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // 根据是否有无商品信息来进行判断显示
    GoodsIsShow () {
      return Object.keys(this.goods).length !== 0
    }
  }
}
</script>

<style scoped>
.base-info {
  margin-top: 10px;
  padding: 0 5px;
}

.goods-title {
  color: black;
  font-size: 18px;
}

.goods-price {
  margin-top: 6px;
  margin-bottom: 15px;
  height: 30px;
  display: flex;
  align-items: center;
}

.goods-new-price {
  color: var(--color-high-text);
  font-size: 24px;
}

.goods-old-price {
  color: grey;
  text-decoration: line-through;
  margin-left: 5px;
}

.goods-discount {
  margin-left: 5px;
  background: var(--color-tint);
  color: white;
  border-radius: 10px;
  padding: 4px;
  font-size: 12px;
}

.goods-number {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 3px solid #f2f2f2;
}

.goods-other {
  display: flex;
  justify-content: space-between;
  height: 40px;
  font-size: 14px;
  border-bottom: 3px solid #f2f2f2;
}

.goods-other img {
  width: 14px;
  height: 14px;
}

.goods-other-info {
  display: flex;
  align-items: center;
}
</style>
