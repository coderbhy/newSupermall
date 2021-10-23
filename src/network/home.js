import { request } from './request'

// 获取首页轮播图数据和每日推荐数据
export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

// 获取选项卡下的商品数据
export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
