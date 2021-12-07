import { createStore } from 'vuex';

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:5000/api'
})

let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

export default createStore({
  state: {
    status: '',
    user: {
      userId: user.id,
      username: user.username,
      token: user.accessToken,
      imageProfile: user.imageUrl
    },
    postsLikedByUser: [],
    commentFromPost: []
  },
  mutations: {
    setStatus: function(state, status) {
      state.status = status;
    },
    logUser: async function (state, user) {
      state.user = {}
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user.userId = user.id;
      state.user.username = user.username
      state.user.token = user.accessToken
      state.user.imageProfile = user.imageUrl;
     
    },
    changeInfo: function(state, infos){
      state.user.imageProfile = infos
    },
    logout:function(state){
      state.user = {}
      state.user = {
      userId: -1,
      username: '',
      token: '',
      imageProfile: ''
      }
      localStorage.clear()


    },

    addLikes: function (state, likes){
      state.postsLikedByUser = likes
    },
    clearLikes: function(state){
      state.postsLikedByUser = []
    },
    showComments: function(state, comments){
      state.commentFromPost = comments
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
  
    
      await instance.post("/user/login", userInfos)
     .then((response) => {
      commit('setStatus', 'connected' )
       
      commit('logUser', response.data)
      console.log(response.data);
      response.data.bpi
     })
     .catch(err => {
      this.$router.push('/main');
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
       console.log(response.data);
      // commit('changeInfo', )
      response.data.bpi
    })
    .catch(err => {
      console.log(err)})
    
   },
   likePost: async ({ commit }, likeInfos) => {
    commit('clearLikes');

   await instance.post(`http://localhost:5000/api/posts/${likeInfos.postId}/likes`, likeInfos )
   .then((response) => {
    response.data.bpi
  })
  .catch(err => {
    console.log(err)})
  },
  
  postComment: async({ commit }, commentInfos) => {
    commit;
    await instance.post(`http://localhost:5000/api/posts/${commentInfos.postId}/comment`, commentInfos)
  },
  
   
  },
  
    modules: {
  }
})

