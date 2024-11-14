import { useUserStore } from '@/stores'
import axios from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const request = axios.create({
  // TODO 1. 配置请求的基础地址和超时时间
  baseURL, // 基地址
  timeout: 100000 // 超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
request.interceptors.response.use(
  // 响应成功
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据

    // 响应成功的处理逻辑
    if (res.data.code === 0) {
      return res
    }
    // 响应失败的处理提示，抛出错误
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  // 响应错误
  (err) => {
    // 错误的默认情况 => 只用给提示就行了
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    console.log(err)
    // TODO 5. 处理401报错
    // 错误的特殊情况 => 401权限不足 或 token 过期 => 拦截到登陆
    if (err.response?.status === 401) {
      router.push('/login') // 跳转的到登陆
    }
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
