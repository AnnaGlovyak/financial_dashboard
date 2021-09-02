import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

import App from './App.vue'

import './style/main.css'

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from './firebase-config.js'

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore()

// console.log(db)


// import { collection, getDocs } from "firebase/firestore"; 

// let arr = []
// async function func(){
// const querySnapshot = await getDocs(collection(db, "cards"));
// querySnapshot.forEach((doc) => {
//   arr.push(doc.data())
// });}
// func()
// console.log(arr);

import router from './router'
import store from './store'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import { firestorePlugin } from 'vuefire'


// import { db } from './db'

// let arr = db.collection('cards')
// console.log(arr);


Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(Notifications)
// Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
