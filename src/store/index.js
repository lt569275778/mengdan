import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import user from './modules/user'
import page from './modules/page'
import getters from './getters'
import group from './modules/group'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    // user,
    page,
    group
  },
  getters
})

export default store
