import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = false;

// 获取浏览器可视区域高度（包含滚动条）、
// 获取浏览器可视区域高度（不包含工具栏高度）、
// 获取body的实际高度  (三个都是相同，兼容性不同的浏览器而设置的)
// Vue.prototype.$screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
// Vue.prototype.$screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

// 引入koi.js工具类(随机获取整数数字)
import { randomNum } from "./utils/koi";
Vue.prototype.randomNum = randomNum;
// 引入DataV,将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view';
Vue.use(dataV)

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入轮播列表
import scroll from 'vue-seamless-scroll';
Vue.use(scroll)
// 引入axios
//import axios from 'axios'
// axios.defaults.baseURL = "http://127.0.0.1:8001/"
// 将axios绑定到vue的原型上
// 在别的组件中 this.$axios
//Vue.prototype.$axios = axios 

// 引入全局css
import './assets/less/style.less';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
