import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

import App from './App.vue'
import './style/main.scss'

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from './firebase-config.js'

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore()


import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'



Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
