/* eslint-disable require-jsdoc */
import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './perssion'
import router from './router'

import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')