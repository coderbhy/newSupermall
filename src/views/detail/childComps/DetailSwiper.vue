<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="item in swiperList"
      :key="item"
    >
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'


export default {
  props: {
    swiperList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }

}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
