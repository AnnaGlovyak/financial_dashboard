import Vue from 'vue'
import Vuex from 'vuex'
import cards from './modules/cards'
import operations from './modules/operations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards,
    operations,
  }
})
