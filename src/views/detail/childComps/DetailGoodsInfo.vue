<template>
  <div
    class="goods-info"
    v-if="showDetail"
  >
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
      >
    </div>
  </div>
</template>

<script>

export default {
  props: {
    detailInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad () {
      // 判断所有的图片都加载完了，进行一次回调即可
      this.counter++;
      if (this.counter === this.imagesLength) {
        // console.log('---')
        this.$emit('img-load')
      }
    }
  },
  watch: {
    detailInfo () {
      // 监听对象中图片数组长度的变化
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  },
  computed: {
    showDetail () {
      return Object.keys(this.detailInfo).length !== 0
    }
  }
}
</script>

<style scoped>
.info-key {
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
}

.info-key::before,
.info-key::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 2px;
  background: rgba(100, 100, 100, 0.2);
}

.info-key::before {
  top: 5px;
  left: 5px;
}

.info-key::after {
  bottom: 5px;
  right: 5px;
}

.info-list > img {
  margin-bottom: 5px;
  width: 100%;
}
</style>
