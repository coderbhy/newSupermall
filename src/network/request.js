import axios from 'axios'

export function request (config) {
  const instance = axios.create({
    // baseURL: '' 接口找 coderwhy 老师
  })
  // 添加拦截器
  instance.interceptors.request.use((config) => {
    return config
  }, err => {
    return Promise.reject(err)
  })
  instance.interceptors.response.use((res) => {
    // 直接将数据返回来,不包含 header 等信息,只有 data 信息
    return res.data
  }, err => {
    return Promise.reject(err)
  })

  return instance(config)
}