import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: ( { commit }, userInfos) =>{
      commit;
      console.log(userInfos);
    }
  },
  modules: {
  }
})
