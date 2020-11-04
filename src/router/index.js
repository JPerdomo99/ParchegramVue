import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'
import UserConfig from '../views/UserConfig.vue'
import PostById from '../views/PostById.vue'
import ConfirmEmail from '../components/ConfirmEmailComponent.vue'
import UserProfile from '../views/UserProfile.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/confirmEmail/:codeConfirmEmail',
    name: 'ConfirmEmail',
    component: ConfirmEmail
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/userConfig',
    name: 'UserConfig',
    component: UserConfig
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostById
  },
  {
    path: '/profile/:user',
    name: 'Profile',
    component: UserProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Protegiendo las rutas de usuarios no autenticados
router.beforeEach((to, from, next) => {
  if (to.name === 'ConfirmEmail' && !Vue.prototype.$session.exists()) next()
  else if (to.name === 'Authentication' && Vue.prototype.$session.exists()) next({ name: 'Home' })
  else if (to.name !== 'Authentication' && !Vue.prototype.$session.exists()) next({ name: 'Authentication' })
  else {
    store.commit('loginNav')
    next()
  }
})

export default router
