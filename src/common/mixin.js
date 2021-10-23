import { debounce } from './utils'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    }
  },
  mounted () {
    this.itemImgListener = debounce(this.imgLoad, 1000)
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}