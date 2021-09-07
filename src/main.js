import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

import App from './App.vue'
import './style/main.scss'

import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from './firebase-config.js'

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore()


import { onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.commit('updateUser', { user })
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});


import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)



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
