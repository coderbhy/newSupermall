<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <!-- v-slot 只能添加在 template 上 -->
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg">
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/category">
      <!-- v-slot 只能添加在 template 上 -->
      <template #item-icon>
        <img src="~assets/img/tabbar/category.svg">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg">
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/cart">
      <!-- v-slot 只能添加在 template 上 -->
      <template #item-icon>
        <img src="~assets/img/tabbar/cart.svg">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/cart_active.svg">
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <!-- v-slot 只能添加在 template 上 -->
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg">
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
</style>
