<template>
  <div
    class="tab-bar-item"
    @click="routeToLink"
  >
    <!-- 在插槽外添加一层div，使得插槽被替换时可以设置相关属性 -->
    <!-- 因为涉及到频繁切换，此处我们使用 v-show 进行判断显示 -->
    <div v-show="!isActive">
      <!-- 该插槽用于接收正常显示的图标 -->
      <slot name="item-icon"></slot>
    </div>
    <div v-show="isActive">
      <!-- 该插槽用于接收活跃显示的图标 -->
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 要求用户可以自定义活跃颜色时，就不能在css中把颜色写死 -->
    <!-- <div :class="{ active: isActive }"> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 每一个 item 对应一个路由跳转
    link: {
      type: String
    },
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    routeToLink () {
      this.$router.push(this.link)
    }
  },
  computed: {
    // 用计算属性来判断当前是哪个 item 处于活跃状态
    isActive () {
      return (this.$route.path.indexOf(this.link) !== -1)
    },
    // 根据当前 item 是否活跃而设置样式
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}

.tab-bar-item div {
  font-size: 14px;
}

/* 用户可以自定义高亮颜色后，这一条class没有意义了 */
.tab-bar-item div.active {
  color: var(--color-high-text);
}
</style>
