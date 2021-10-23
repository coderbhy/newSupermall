<template>
  <div id="detail">
    <!-- 顶部导航栏组件 -->
    <detail-nav-bar
      @scroll-to-index="scrollToIndex"
      ref="navBar"
    />

    <scroll
      class="detail-scroll"
      ref="scroll"
      @scroll="changeIndex"
      :probe-type="3"
    >
      <!-- 轮播图组件 -->
      <detail-swiper :swiper-list="swiperList" />
      <!-- 商品信息 -->
      <detail-base-info :goods="goods" />
      <!-- 商品详细信息 -->
      <detail-goods-info
        :detail-info="detailInfo"
        @img-load="imgLoad"
      />
      <!-- 参数信息 -->
      <detail-param-info
        :param-info="paramInfo"
        ref="paramInfo"
      />
      <!-- 评论信息 -->
      <detail-comment-info
        :comment-info="commentInfo"
        ref="commentInfo"
      />
      <!-- 推荐数据 -->
      <goods-list
        :goods="recommend"
        class="goods-list"
        ref="recommendInfo"
      />
    </scroll>

    <detail-bottom-bar />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, Goods, GoodsParams, getRecommend } from 'network/detail'
import { itemListenerMixin } from 'common/mixin'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      swiperList: [],
      goods: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommend: [],
      itemImgListener: null,
      themeTopYs: [],
      currentIndex: 0
    }
  },
  created () {
    // 拿到 url 中商品的 iid
    this.iid = this.$route.params.iid
    // 根据 iid 获取数据
    getDetail(this.iid)
      .then(res => {
        // console.log(res)
        // 获取轮播图信息
        this.swiperList = res.result.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        // 获取商品详细展示信息
        this.detailInfo = res.result.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParams(res.result.itemParams.info, res.result.itemParams.rule)
        // 获取评论信息
        if (res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list
        }
        // 把数据传给组件时，组件内容并不是立即更新的
        // 组件先要进行渲染的过程
        // 因此此时我们拿到的值还是 undefined
        // 要拿到正确的数据，我们必须要等到组件渲染完成
        this.$nextTick(() => {
          // 在这里面 dom 是加载完了
          // 但是图片依然没有加载完
          // 因此拿到的数据依然是错误的
          // 这里面的 offsetTop 值是不包含图片的
          // offsetTop 值不对，一般都是因为图片产生的
          // this.themeTopYs = []
          // this.themeTopYs.push(0)
          // this.themeTopYs.push(-this.$refs.paramInfo.$el.offsetTop)
          // this.themeTopYs.push(-this.$refs.commentInfo.$el.offsetTop)
          // this.themeTopYs.push(-this.$refs.recommendInfo.$el.offsetTop)
          // console.log(this.themeTopYs);
        })
      })
    // 请求推荐数据
    getRecommend()
      .then(res => {
        this.recommend = res.data.list
      })
  },
  mixins: [itemListenerMixin],
  methods: {
    // 每次加载好图片后重新计算 content 的高度
    imgLoad () {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(-this.$refs.paramInfo.$el.offsetTop + 44)
      this.themeTopYs.push(-this.$refs.commentInfo.$el.offsetTop + 44)
      this.themeTopYs.push(-this.$refs.recommendInfo.$el.offsetTop + 44)
      console.log(this.themeTopYs);
    },
    // 监听顶部栏的点击事件
    scrollToIndex (index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 1000)
    },
    // 监听滚动事件，改变顶部栏的展示问题
    changeIndex (position) {
      // console.log(position);
      let positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i in this.themeTopYs) {
        if (+i === length - 1 && positionY >= -this.themeTopYs[+i]) {
          this.currentIndex = +i;
        } else if (+i < length - 1 && positionY >= -this.themeTopYs[+i] && positionY < -this.themeTopYs[+i + 1]) {
          this.currentIndex = +i;
        }
      }
      this.$refs.navBar.currentIndex = this.currentIndex
    }
  },
  mounted () {

    // 数据可能会出现 undefined 的情况
    // 因为网络请求是一个异步操作
    // 有可能还在请求，就已经执行到这句代码了
    // 因此不能在 mounted 中求取高度
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommendInfo.$el.offsetTop)
    // console.log(this.themeTopYs);
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  // 在组件被摧毁前，停止监听
  beforeDestroy () {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
.detail-scroll {
  height: calc(100vh - 44px - 49px);
  /* 添加 overflow: hidden 保证向上滚动时不会覆盖顶部 navbar */
  overflow: hidden;
}

.goods-list {
  padding-top: 5px;
}
</style>
