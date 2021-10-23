<template>
  <!-- 封装该组件，因为该组件可能只会在这个项目用到，且在项目中出现多次 -->
  <!-- 因此将该组件放到 content 文件夹下 -->
  <!-- 在各处使用该组件时，可以发现只有文字是不一样的 -->
  <!-- 因此我们可以不必使用 slot -->
  <!-- 而是将结构固定死，只需要通过 props 来获取列表即可 -->
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      @click="changeIndex(index)"
    >
      <span :class="{ active: index === currentIndex }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
      // 点击切换后把点击了谁传到父组件中
      this.$emit('change-tab', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: white;
}

.tab-control .tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 0 5px 5px 5px;
}

.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>
