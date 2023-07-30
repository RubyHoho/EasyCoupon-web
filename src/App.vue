<template>
  <div class="app">
    <div class="left">
      <el-input
        v-model="activityCode"
        placeholder="请输入活动编码"
      ></el-input>
      <el-button
        type="primary"
        @click="getProcessCodes"
      >关联流程编码</el-button>
      <div class="process-list">
        <!-- 使用ProcessItem组件，并传入活动编码和流程编码作为props，监听自定义事件并处理结果数据 -->
        <ProcessItem
          v-for="(processCode, index) in processCodes"
          :key="index"
          :activityCode="activityCode"
          :processCode="processCode"
          @process-done="handleResult"
        ></ProcessItem>
      </div>
    </div>
    <div class="right">
      <pre>{{ result }}</pre>
    </div>
  </div>
</template>

<script>
// 引入api.js文件中定义的getProcessCodes函数
import { getProcessCodes } from './api/api.js'
// 引入ProcessItem.vue组件
import ProcessItem from './components/ProcessItem.vue'

export default {
  name: 'App',
  components: {
    // 注册ProcessItem组件
    ProcessItem
  },
  data() {
    return {
      // 活动编码
      activityCode: '',
      // 流程编码列表
      processCodes: [],
      // 结果数据
      result: ''
    }
  },
  methods: {
    // 获取流程编码列表
    async getProcessCodes() {
      try {
        // 调用getProcessCodes函数，传入活动编码，并等待响应数据
        const data = await getProcessCodes(this.activityCode)
        // 更新流程编码列表
        this.processCodes = data
      } catch (error) {
        // 弹出错误提示
        this.$message.error(error.message)
      }
    },
    // 处理结果数据
    handleResult(data) {
      // 更新结果数据，并格式化为json字符串
      this.result = JSON.stringify(data, null, 2)
    }
  }
}
</script>

<style>
.app {
  display: flex;
  height: 100vh;
}

.left {
  width: 50%;
  padding: 20px;
}

.right {
  width: 50%;
  padding: 20px;
}

.process-list {
  margin-top: 20px;
}
</style>
