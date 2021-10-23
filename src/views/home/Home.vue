<template>
  <div id="home">
    <!-- 因为我们要向 nav-bar 的插槽中添加东西,因此我们不能使用单标签 -->
    <nav-bar
      class="home-nav"
      ref="navbar"
    >
      <template #center>
        购物街
      </template>
    </nav-bar>

    <tab-control
      :titles="titles"
      class="top-home-control"
      @change-tab="changeTab"
      ref="topTabControl"
      v-show="tabIsFixed"
    />

    <!-- 使用 better-scroll 封装的组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pulling-up="loadMore"
    >
      <!-- 轮播图组件 -->
      <home-swiper
        :banner-list="bannerList"
        @swiper-img-load="swiperImgLoad"
      />
      <!-- 每日推荐组件 -->
      <home-recommend :recommend-list="recommendList" />
      <!-- 本周流行组件 -->
      <home-feature />
      <!-- 选项卡组件 -->
      <tab-control
        :titles="titles"
        class="home-control"
        @change-tab="changeTab"
        ref="tabControl"
      />
      <!-- 商品展示组件 -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 监听组件根元素的原生事件，要用 .native 修饰符 -->
    <back-top
      @click.native="backTop"
      v-show="backTopIsShow"
    />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/common//backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'
import HomeFeature from './childComps/HomeFeature.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'

import { debounce } from 'common/utils'

export default {
  data () {
    return {
      bannerList: [],
      recommendList: [],
      titles: ['流行', '新款', '精选'],
      // 展示的数据模型
      goods: {
        pop: {
          list: [],
          page: 0
        },
        new: {
          list: [],
          page: 0
        },
        sell: {
          list: [],
          page: 0
        }
      },
      // 当前展示类型
      currentType: 'pop',
      // 是否显示 backTop 按钮
      backTopIsShow: false,
      // 经过防抖处理后的 refresh 函数
      refresh: null,
      // 选项卡和顶部的距离
      tabOffsetTop: 0,
      // 判断选项卡是否吸顶
      tabIsFixed: false,
      // 离开 Home 时当前页面状态（距离顶部的距离）
      saveY: 0
    }
  },
  components: {
    NavBar,

    HomeSwiper,
    HomeRecommend,
    HomeFeature,

    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 随时准备监听图片加载好后的事件
    // 图片加载完成后重新计算可滚动高度

    // 防抖函数
    // 起作用的过程：
    // 若直接执行 refresh 函数，则会被执行 30 次
    // 可以将 refresh 函数传到 debounce 函数中，生成一个新的函数
    this.refresh = debounce(this.itemImgLoad, 1000)
    this.$bus.$on('itemImgLoad', this.refresh)
  },
  methods: {
    // 点击 backTop 按钮，调用 scroll 组件的事件，使页面回到顶部
    backTop () {
      // 第三个参数为动画时间，单位为 ms
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 监听图片加载好后的处理事件
    itemImgLoad () {
      // 这里会出一个bug，refresh函数找不到
      // 有可能是因为图片加载较快，图片加载完成后，
      // scroll 组件中的 scroll 对象有可能还未初始化
      // 因此调用 refresh 函数会报错
      // 解决方法：在调用 refresh 函数前先判断 this.$ref.scroll 下的 scroll 对象是否存在
      // 但是这样也还是会有问题
      // 暂时解决方法如下代码
      // this.$refs.scroll && this.$refs.scroll.refresh()

      // 将该方法单独抽离出来，可解决 bug
      // bug 的出现可能是因为离开这个界面时并没有销毁该监听事件

      // 图片只要加载好一次，就会调用一次该函数
      // 频繁地调用 refresh 函数会降低性能
      // 在这里我们需使用防抖函数进行解决
      this.$refs.scroll.refresh()
    },
    // 监听轮播图是否加载完成
    swiperImgLoad () {
      // 2. 获取 tabControl 的 offsetTop
      // 组件上是没有 offsetTop 这个属性的
      // 我们要通过获取里面的元素来获取 offsetTop
      // 这时候拿到的 offsetTop 可能是不包括图片的
      // 必须要等图片加载完成进行拿取，其值才是正确的
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },

    /**
     * 网络请求相关方法
     */
    // 请求轮播图数据和每日推荐数据
    getHomeMultidata () {
      getHomeMultidata()
        .then(res => {
          this.bannerList = res.data.banner.list
          this.recommendList = res.data.recommend.list
        })
    },
    // 请求商品数据
    getHomeGoods (type) {
      getHomeGoods(type, ++this.goods[type].page)
        .then(res => {
          // 使用 spread 语法，将每次请求到的数据添加到 goods 中
          // 不可直接传数组进去
          // 传数据时，它会把整个数组当成一个元素 push 进去，里面就是一个二重数组
          this.goods[type].list.push(...res.data.list)

          // 上拉加载更多后告诉 scroll 上拉已完成
          this.$refs.scroll.finishPullUp()
        })
    },

    /**
     * 事件监听相关方法
     */
    // 监听选项卡点击事件，进行切换
    changeTab (index) {
      // console.log(index)
      // 根据 index 来确定当前展示类型
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.topTabControl.currentIndex = index
      this.$refs.tabControl.currentIndex = index
    },
    // 监听 scroll 事件，决定按钮是否显示
    contentScroll (position) {
      // 判断 backTop 是否显示
      this.backTopIsShow = position.y < (-500) ? true : false

      // 判断 tabControl 是否吸顶
      // this.tabIsFixed = position.y < (-this.tabOffsetTop + this.$refs.tabControl.$el.offsetHeight) ? true : false
      this.tabIsFixed = position.y <= -this.tabOffsetTop + this.$refs.navbar.$el.offsetHeight ? true : false
    },
    // 上拉加载更多商品数据
    loadMore () {
      this.getHomeGoods(this.currentType)
    }
  },
  computed: {
    // 用计算属性来获取展示的商品列表
    showGoods () {
      return this.goods[this.currentType].list
    },
    // 根据 tabControl 是否吸顶来书写样式
    // 这么书写可以发现在下滑时样式是可以生效的，但是此时会出现两个问题
    // 第一个问题是滑动到临界点时下面的内容会向上提一下
    // 第二个问题是 better scroll 会修改 transform，导致 fixed 定位出现问题
    // tabFixedStyle () {
    //   if (!this.tabIsFixed) {
    //     return {}
    //   } else {
    //     return {
    //       position: 'fixed',
    //       left: 0,
    //       right: 0,
    //       top: '44px'
    //     }
    //   }
    // }
  },
  // 在组件被摧毁前，停止监听
  beforeDestroy () {
    this.$bus.$off('itemImgLoad', this.refresh)
  },
  activated () {
    // 不添加第三个参数，在 tabControl 中切换，再切换 tabbar 不会出现问题
    this.$refs.scroll.scrollTo(0, this.saveY)
    // 使用这个方法后，不会出现多次切换滚回顶部的问题
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 离开时保存
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消监听
    this.$bus.$off('itemImgLoad', this.refresh)
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
}

.home-nav {
  background: var(--color-tint);
  color: white;
  /* 将导航栏固定在顶部 */
  /* position: fixed; */
  /* 向下滑动时可能会出现轮播图覆盖导航栏的情况 */
  /* 因此在这里设置 z-index,让导航栏始终显示在最上层 */
  /* z-index: 100;
  left: 0;
  right: 0;
  top: 0; */
}

.home-control {
  /* 让首页的 tab-control 滚动到一定距离后固定在顶部 */

  /* 使用 better-scroll 后，系统无法再监听滚动位置，这个属性会失效 */
  /* position: sticky;
  top: 44px; */
  z-index: 100;
}

#home .content {
  /* 设置可滚动区域的高度 */
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}

.top-home-control {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
