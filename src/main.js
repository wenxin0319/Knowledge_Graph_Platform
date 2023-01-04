import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import Echarts from './views/neo4j/echarts_v1.vue'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css


import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.prototype.$echarts = echarts; //注册echarts，导入到vue原型中

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.component('MyEcharts',Echarts);
