<template>
  <div class="process-item">
    <span>{{ processCode }}</span>
    <el-button type="success" @click="handleClick">触发流程</el-button>
  </div>
</template>

<script>
// 引入api.js文件中定义的doProcess函数
import { doProcess } from '../api/api.js'

export default {
  name: 'ProcessItem',
  props: {
    // 流程编码
    processCode: {
      type: String,
      required: true
    },
    // 活动编码
    activityCode: {
      type: String,
      required: true
    }
  },
  methods: {
    // 触发流程并返回结果
    async handleClick() {
      try {
        // 调用doProcess函数，传入活动编码和流程编码，并等待响应数据
        const data = await doProcess(this.activityCode, this.processCode)
        // 触发一个自定义事件，并传递响应数据给父组件
        this.$emit('process-done', data)
      } catch (error) {
        // 弹出错误提示
        this.$message.error(error.message)
      }
    }
  }
}
</script>

<style scoped>
.process-item {
  display: flex;
  align-items: center;
}

.process-item span {
  flex: 1;
}
</style>
