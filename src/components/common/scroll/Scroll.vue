<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    // 有些人用组件可能需要实时监听，有些人可能不需要实时监听
    probeType: {
      type: Number,
      default: 0
    },
    // 有些人用组件可能需要上拉加载，有些人可能不需要上拉加载
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 是否实时侦测位置
    // 0和1都是不侦测实时位置
    // 2是实时侦测：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测
    // 3只要是滚动，都侦测，不论是手指滚动还是惯性滚动

    // 最好不用 document.querySelector
    // 可能根据 class 拿到的元素不准确，因为 class 会重复出现
    // 最好的方法是给容器绑定一个 ref
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      // better-srcoll 默认无法监听 wrapper 中的点击事件
      // 设置为 true 才可以进行监听
      // 注：无论是否设置 click: true，button 都可以点击
      // 但是 div 不能监听点击，必须设置 click: true 才能监听 div 的点击事件
      click: true,
      pullUpLoad: this.pullUpLoad,
      // 只配置以上属性时不能正常进行滚动
      // 添加以下配置可以正常进行滚动
      observeDOM: true,
      // 一开始加载网页时，请求图片是异步操作，但是此时 better-scroll 已经开始计算content的高度
      // 这就导致了一个问题，better scroll 计算出来可滚动的总高度是不包括图片的，
      // 这里就会出现一个bug，图片加载好后，我只能滚先前计算好的总高度
      // 这会导致下面有一部分无法滚动 
      // 通过调用 refresh()，使请求数据后，等待图片加载完成后，重新计算可滚动高度，可解决此bug
      // better scroll 2版本中加入了以下两个属性可完美解决该问题
      observeImage: true,
      mouseWheel: true
    })

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }

    // 滚动到底部，上拉加载更多
    // 如果启用上拉加载更多，就监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载');
        // 给父组件发送事情，请求更多数据
        this.$emit('pulling-up')
      })
    }
  },
  methods: {
    scrollTo (x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
