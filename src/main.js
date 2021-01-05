import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/es'
import VueSession from 'vue-session'
import VueSignalR from '@latelier/vue-signalr'

Vue.config.productionTip = true
Vue.use(ElementUI, { locale })
Vue.use(VueSession)
Vue.use(VueSignalR, 'http://julian1999-001-site1.btempurl.com/chathub')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
