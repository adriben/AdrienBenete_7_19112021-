import { createStore } from 'vuex';

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      username: '',
      token:''
    }
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      // instance.defaults.headers.common['Authorization'] = user.token;
      state.user.userId = user.id
      state.user.username = user.username
    }
  },
  actions: {
    createAccount: async ({ commit }, userInfos) => {
      commit;
      instance.post("/user/register", userInfos)
      .then((response) => {
        commit('setStatus', 'created' )
        response.data.bpi
      })
      .catch(err => {
        commit('setStatus', 'error_login' )
        console.log(err)})
    
  },
   loginAccount: async ({ commit }, userInfos) => {
     commit('setStatus', 'loading')
      await instance.post("/user/login", userInfos)
     .then((response) => {
       commit('setStatus', 'connected' )
       commit('logUser', response.data)
       console.log(response.data.username);
      response.data.bpi
     })
     .catch(err => {
      commit('setStatus', 'error_login' ) 
      console.log(err)})
   },
   changeInfos: async ({ commit }, userInfos) => {
     commit;
     console.log(userInfos.image);
     await instance.put("/user/userInfo", userInfos)
    
   }
   
   
  },
  modules: {
  }
})

