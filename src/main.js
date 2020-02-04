import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast/index'


import FastClick from 'fastclick'

import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

FastClick.attach(document.body); // vue解决点击延迟300毫秒的问题

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()  // 事件总线创建

Vue.use(toast) // 安装 toast 自定义插件

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
