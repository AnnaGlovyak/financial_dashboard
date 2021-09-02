
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Auth from '../pages/Auth.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'main'}
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'main'},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import('../components/Operations.vue'),
    meta: { layout: 'main', auth: true}
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('../components/Analytics.vue'),
    meta: { layout: 'main', auth: true}
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../pages/Card.vue'),
    meta: { layout: 'card', auth: true}
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth,
    meta: {layout: 'auth', auth: false}
  }
]

const router = new VueRouter({
  routes
})

export default router
