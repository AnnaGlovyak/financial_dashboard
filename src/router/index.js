
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'
import store from '../store'


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { layout: 'main', authRequired: true}
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import('../components/Operations.vue'),
    meta: { layout: 'main', authRequired: true}
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../components/Analytics.vue'),
    meta: { layout: 'main', authRequired: true}
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth,
    meta: {layout: 'auth', authRequired: false}
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if(!store.state.user) {
      next({
        // path: '/home',
        // query: { redirect: to.fullPath }
      })
      return
    }
    next()
  } else {
    next()
  }
})
export default router

