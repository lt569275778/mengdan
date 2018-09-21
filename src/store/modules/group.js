import { gourplist, modifymenu, deletemeun, getpageid } from '../../api/api'
const group = {
  state: {
    gourplist: [],
    pagelist: []
  },
  mutations: {
    GROUP_LIST: (state, data) => {
      state.gourplist = data
      window.localStorage.setItem('gourplist', state.gourplist)
    },
    GET_PAGEID: (state, data) => {
      state.pagelist = data
    }
  },
  actions: {
    async getgrourplist({ commit }, lists) {
      await gourplist(lists.subid, lists.envid).then(res => {
        commit('GROUP_LIST', res.data.data)
      })
    },
    // async addmeun({ commit }, listid) {
    //   await addmeunlist(listid.subid, listid.envid, listid).then(res => {
    //     commit('GROUP_LIST', res.data.data)
    //   })
    // },
    modifymenulist({ commit }, menulist) {
      return new Promise((resolve, reject) => {
        modifymenu(menulist.parentID, menulist).then(res => {
          commit('GROUP_LIST', res.data.data)
          resolve(res.data)
        }).catch(reject)
      })
    },
    deletemenulist({ commit }, menulist) {
      return new Promise((resolve, reject) => {
        deletemeun(menulist).then(res => {
          commit('GROUP_LIST', res.data.data)
          resolve(res.data)
        }).catch(reject)
      })
    },
    async getpageid({ commit }, payload) {
      await getpageid(payload).then(res => {
        commit('GET_PAGEID', res.data.data)
      })
    }
  }
}

export default group
