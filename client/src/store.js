import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// const types = {
//   SET_AUTHENTICATION :"SET_AUTHENTICATED",//是否
//   SET_USER:'SET_USER'
// }

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {} //用户信息
  },
  getters: { //获取
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
  },
  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    // [types.SET_AUTHENTICATED](state,isAuthenticated){
    //   if(isAuthenticated){
    //     state.isAuthenticated = isAuthenticated
    //   }else{
    //     state.isAuthenticated = false
    //   }
    // },
    // [types.SET_USER](state,user){
    //   if(user){
    //     state.user = user
    //   }else{
    //     state.user = {}
    //   }
    // }
    setAuthenticated(state, isAuthenticated) {
      if (isAuthenticated) {
        state.isAuthenticated = isAuthenticated
      } else {
        state.isAuthenticated = false
      }
    },
    setUser(state, user) {
      if (user) {
        state.user = user
      } else {
        state.user = {}
      }
    }
  },
  actions: {
    setAuthenticated: ({
      commit
    }, isAuthenticated) => {
      commit('setAuthenticated', isAuthenticated)
    },
    setUser: ({
      commit
    }, user) => {
      commit('setUser', user)
    },
    clearCurrentState: ({
      commit
    }) => {
      commit('setAuthenticated', false),
      commit('setUser',null)
    }
  }
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法

})