import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/es'
import VueSession from 'vue-session'
import VueSignalR from '@latelier/vue-signalr'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueSession)
Vue.use(VueSignalR, 'https://localhost:44377/chathub')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
