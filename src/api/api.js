// 引入axios
import axios from 'axios'

// 创建一个axios实例，并设置一些默认配置，例如基础URL，超时时间等
const instance = axios.create({
    baseURL: '', // 这里改成空字符串
    timeout: 10000
  })
  

// 添加请求拦截器，可以在这里做一些请求前的处理，例如添加请求头，添加token等
instance.interceptors.request.use(config => {
  // 这里只是举例，你可以根据你的实际情况来定义
  config.headers['Content-Type'] = 'application/json'
  config.headers['Authorization'] = 'Bearer some token'
  return config
}, error => {
  // 请求失败的处理
  return Promise.reject(error)
})

// 添加响应拦截器，可以在这里做一些响应后的处理，例如判断响应状态码，处理错误信息等
instance.interceptors.response.use(response => {
  // 这里只是举例，你可以根据你的实际情况来定义
  const { code, message, data } = response.data
  if (code === 200) {
    // 响应成功，返回数据
    return data
  } else {
    // 响应失败，抛出错误信息
    throw new Error(message)
  }
}, error => {
  // 响应失败的处理
  return Promise.reject(error)
})

// 定义一个函数，用于获取流程编码列表
export function getProcessCodes(activityCode) {
    // 打印一下活动编码
  console.log('getProcessCodes', activityCode)
  // 返回一个promise对象，发送get请求，传入活动编码作为参数
  return instance.get('/api/getProcessCodes', {
    params: {
      activityCode
    }
  })
}

// 定义一个函数，用于触发流程并返回结果
export function doProcess(activityCode, processCode) {
  // 返回一个promise对象，发送post请求，传入活动编码和流程编码作为请求体
  return instance.post('/api/doProcess', {
    activityCode,
    processCode
  })
}
