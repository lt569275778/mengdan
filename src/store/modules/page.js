import { lookOption, getsubject, projectid, logout, platformid, getpage, getmeunlist, getpageid } from '../../api/api'
// import { asyncRouterMap } from '../../router/index.js'
const page = {
  state: {
    personinfo: [],
    subject: [],
    ids: [],
    platform: [],
    token: [],
    pageform: [],
    menulist: [],
    pagestructure: []
    // menu1: 1234
  },
  mutations: {
    PER_INFO: (state, data) => {
      state.personinfo = data
    },
    GET_SUB: (state, data) => {
      state.subject = data
    },
    PRO_ID: (state, data) => {
      state.ids = data
    },
    PLA_ID: (state, data) => {
      state.platform = data
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    PAGE_ID: (state, data) => {
      state.pageform = data
    },
    GET_LIST: (state, data) => {
      state.menulist = data
    },
    GET_pagestructure: (state, data) => {
      state.pagestructure = data
    }
    // GET_MENU: (state, data) => {
    //   state.menu1 = data
    // }

  },
  actions: {
    async GetInfo({ commit }) {
      await lookOption().then(res => {
        commit('PER_INFO', res.data.data)
      })
    },
    async getSubject({ commit }) {
      await getsubject().then(res => {
        commit('GET_SUB', res.data.data)
      })
    },
    async subproject({ commit }, payload) {
      await projectid(payload).then(res => {
        commit('PRO_ID', res.data.data)
      })
    },
    async getplatform({ commit }, user) {
      await platformid(user.subid, user.envid).then(res => {
        commit('PLA_ID', res.data.data)
      })
    },
    async LOGOT({ commit }) {
      await logout().then(res => {
        commit('SET_TOKEN')
      })
    },
    async getpageform({ commit }, idss) {
      await getpage(idss.subid, idss.envid).then(res => {
        commit('PAGE_ID', res.data.data)
      })
    },
    async getmenulists({ commit }, idss) {
      await getmeunlist(idss.subid, idss.envid, idss.platformid).then(res => {
        commit('GET_LIST', res.data.data)
      })
    },
    async getpagestructure({ commit }, pageid) {
      await getpageid(pageid).then(res => {
        commit('GET_pagestructure', res.data.data)
      })
    }
    // getmun({ commit }) {
    //   commit('GET_MENU')
    // }

    // deletepageidlist({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     deletepageid(payload).then(res => {
    //       commit('GET_pagestructure', res.data)
    //       resolve(res.data)
    //     }).catch(reject)
    //   })
    // }
  }
}
export default page
