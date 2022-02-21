import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant核心库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'

// 加载全局样式
import './style/index.less'

Vue.config.productionTip = false
// 注册使用vant 组件库
Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
