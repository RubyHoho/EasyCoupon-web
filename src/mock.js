// 引入axios和MockAdapter
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// 创建一个MockAdapter实例
const mock = new MockAdapter(axios)

// 模拟一个get请求，用于查询活动编码对应的流程编码列表
mock.onGet('/api/getProcessCodes').reply(config => {
    // 打印一下请求参数
  console.log('getProcessCodes', config.params)
  // 获取请求参数中的活动编码
  const activityCode = config.params.activityCode

  // 根据活动编码返回不同的流程编码列表，这里只是举例，你可以根据你的实际情况来定义
  let processCodes = []
  if (activityCode === 'abc') {
    processCodes = ['001', '002', '003']
  } else if (activityCode === 'TY_E7S6NVB68OF9KFKBE53O') {
    processCodes = ['004', '005']
  } else {
    processCodes = ['006']
  }

  // 返回一个成功的响应，包含流程编码列表
  return [200, {
    code: 200,
    message: 'success',
    data: processCodes
  }]
})

// 模拟一个post请求，用于触发流程并返回结果
mock.onPost('/api/doProcess').reply(config => {
    // 打印一下请求体
  console.log('doProcess', JSON.parse(config.data))
  // 获取请求体中的活动编码和流程编码
  const { activityCode, processCode } = JSON.parse(config.data)

  // 根据活动编码和流程编码返回不同的结果，这里只是举例，你可以根据你的实际情况来定义
  let result = ''
  if (activityCode === 'abc' && processCode === '001') {
    result = 'some result'
  } else if (activityCode === 'abc' && processCode === '002') {
    result = 'another result'
  } else {
    result = 'default result'
  }

  // 返回一个成功的响应，包含结果数据
  return [200, {
    code: 200,
    message: 'success',
    data: {
      activityCode,
      processCode,
      result
    }
  }]
})
