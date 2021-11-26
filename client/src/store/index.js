import { createStore } from 'vuex';

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    createAccount: async ({ commit }, userInfos) => {
      commit;
      instance.post("/user/register", userInfos)
      .then((response) => {
        response.data.bpi
      })
      .catch(err => console.log(err))
    
  },
   loginAccount: async ({ commit }, userInfos) => {
     commit;
      instance.post("/user/login", userInfos)
     .then((response) => {
       console.log(response);
     })
     .catch(err => console.log(err))

   }
  },
  modules: {
  }
})

