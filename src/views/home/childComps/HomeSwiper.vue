<template>
  <swiper>
    <swiper-item
      v-for="item in bannerList"
      :key="item.title"
    >
      <!-- 轮播图是可点击的,因此先要包装一层 a 标签 -->
      <a :href="item.link">
        <img
          :src="item.image"
          @load="swiperLoad"
        >
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  props: {
    bannerList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
      isLoad: false
    }
  },
  methods: {
    swiperLoad () {
      // 只需要发出一次事件
      if (!this.isLoad) {
        this.$emit('swiper-img-load')
        this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>
</style>
