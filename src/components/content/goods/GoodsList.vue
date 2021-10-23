<template>
  <div class="goods-list">
    <goods-list-item
      v-for="item in goods"
      :key="item.key"
      :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  /* 如何让一行显示两个 item  */
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
