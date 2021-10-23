<template>
  <div id="app">
    <!-- 在edge的移动端模拟测试下，有时候css样式会出现一些问题 -->
    <!-- 解决方法：切换至 pc 端，再切换至移动端即可解决 -->

    <!-- 点击底部 tabbar 切换时不销毁以前的组件 -->
    <!-- 让组件保持原有的状态 -->
    <!-- 让Home中的内容保持原有的位置 -->

    <!-- Detail 组件不用保持 keep-alive 状态 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>

    <main-tab-bar v-show="showTabBar" />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  components: {
    MainTabBar
  },
  computed: {
    // 在详情页不显示 mainTabBar
    showTabBar () {
      return this.$route.path.indexOf('detail') === -1
    }
  }
}
</script>


<style scoped>
@import "./assets/css/base.css";
</style>
