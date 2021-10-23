<template>
  <div class="home-recommend">
    <div
      class="home-recommend-item"
      v-for="item in recommendList"
      :key="item.title"
    >
      <!-- 这个地方是可以点击跳转的,因此先要用一层 a 标签包裹 -->
      <a :href="item.link">
        <img :src="item.image">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommendList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.home-recommend {
  display: flex;
  text-align: center;
  padding-top: 10px;
  font-size: 14px;
  padding-bottom: 20px;
  border-bottom: 10px solid rgba(100, 100, 100, 0.2);
}

.home-recommend .home-recommend-item {
  flex: 1;
}

.home-recommend .home-recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 3px;
}
</style>
