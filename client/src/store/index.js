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
      token:'',
      imageProfile: ''
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
      state.user.imageProfile = user.imageUrl
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
      
      response.data.bpi
     })
     .catch(err => {
      commit('setStatus', 'error_login' ) 
      console.log(err)})
   },
   changeInfos: async ({ commit }, userInfos) => {
    
     commit;
     const formData = new FormData();
     let userId = userInfos.userId
     let imageFile = userInfos.image
     formData.append('image', imageFile)
     formData.append('userId', userId)
     console.log(Array.from(formData));
     await instance.put("/user/userInfo", formData)
     .then((response) => {
     
      response.data.bpi
    })
    .catch(err => {
      console.log(err)})
    
   }
   
   
  },
  modules: {
  }
})
