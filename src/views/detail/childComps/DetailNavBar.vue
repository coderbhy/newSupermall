<template>
  <nav-bar class="detail-nav-bar">
    <template #left>
      <div
        class="back"
        @click="backToHome"
      >
        <img src="~assets/img/detail/back.svg">
      </div>
    </template>
    <template #center>
      <div class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          :class="{ active: index === currentIndex }"
          @click="changeIndex(index)"
        >{{ item }}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
      this.$emit('scroll-to-index', index)
    },
    backToHome () {
      this.$router.back()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.detail-nav-bar {
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
}

.back {
  height: 100%;
}
.back > img {
  width: 24px;
  height: 24px;
  margin: 10px 0;
}

.title {
  display: flex;
}

.title > div {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>
