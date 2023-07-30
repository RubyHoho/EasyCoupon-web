// 引入vue3和App.vue组件
import { createApp } from 'vue'
import App from './App.vue'

// 引入element-plus和样式文件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// 引入mock.js文件，注意这里只是为了演示，实际开发中不需要引入这个文件，直接调用真实的后端接口即可
import './mock.js'

// 创建一个vue3应用，并使用element-plus插件，然后挂载App.vue组件到#app元素上
createApp(App).use(ElementPlus).mount('#app')
