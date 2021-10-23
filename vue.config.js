module.exports = {
  configureWebpack: {
    resolve: {
      // 配置文件夹别名
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        network: '@/network',
        views: '@/views'
      }
    }
  }
}