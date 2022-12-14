import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入echarts
import * as echarts from 'echarts'

import VueWechatTitle from 'vue-wechat-title'; 


Vue.prototype.$echarts = echarts


Vue.config.productionTip = false



// 设置后端接口地址
axios.defaults.baseURL = 'http://elifse.cloud:8090'

// 将axios设置为Vue的原型属性
Vue.prototype.$http = axios


// 将element-ui注册为全局组件
Vue.use(ElementUI)

// 将vue-wechat-title注册为全局组件
Vue.use(VueWechatTitle)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
