import { createStore } from "vuex";
import router from "../router/index";

const axios = require("axios");
const instance = axios.create({        //instation of the base URL for the calls
  baseURL: "http://localhost:5000/api",
});

let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  //if there is nothing in local storage then the default userID is -1
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    instance.defaults.headers.common["Authorization"] = user.accessToken;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

export default createStore({
  //create a store with the user when he login,
  state: {
    status: "",
    user: {
      userId: user.id,
      username: user.username,
      token: user.accessToken,
      imageProfile: user.imageUrl,
      bio: user.bio,
      role: user.role,
      isAdmin: user.isAdmin,
    },
    postsLikedByUser: [],
    commentFromPost: [],
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: async function (state, user) {
      state.user = {};

      instance.defaults.headers.common["Authorization"] = user.accessToken;
      localStorage.setItem("user", JSON.stringify(user));

      state.user.userId = user.id;
      state.user.username = user.username;
      state.user.token = user.accessToken;
      state.user.imageProfile = user.imageUrl;
      state.user.isAdmin = user.isAdmin;
    },
    changeInfo: function (state, infos) {
      if (infos.image != null) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.imageUrl = infos.image;
        localStorage.setItem("user", JSON.stringify(user));
      }

      state.user.imageProfile = infos.image;
      state.user.bio = infos.bio;
      state.user.role = infos.role;
    },
    logout: function (state) {
      state.user = {}; //on the logout we modify the userId so it become -1 again
      state.user = {
        userId: -1,
        username: "",
        token: "",
        imageProfile: "",
      };
      localStorage.clear(); //delete everything from localstorage
    },

    addLikes: function (state, likes) {
      state.postsLikedByUser = likes;
    },
    clearLikes: function (state) {
      state.postsLikedByUser = [];
    },
    showComments: function (state, comments) {
      state.commentFromPost = comments;
    },
  },
  actions: {
    createAccount: async ({ commit }, userInfos) => {
      commit;
      instance
        .post("/user/register", userInfos)
        .then((response) => {
          commit("setStatus", "connected");
          response.data.bpi;
        })
        .then(() => {
          instance
            .post("/user/login", userInfos)
            .then((response) => {
              commit("setStatus", "connected");
              commit("logUser", response.data);
              response.data.bpi;
            })
            .then(() => {
              router.push("/main");
              user = JSON.parse(localStorage.getItem("user"));
            });
        })
        .catch((err) => {
          commit("setStatus", "error_login");
          console.log(err);
        });
    },
    loginAccount: async ({ commit }, userInfos) => {
      await instance
        .post("/user/login", userInfos)
        .then((response) => {
          commit("logUser", response.data);
          response.data.bpi;
        })
        .then(() => {
          user = JSON.parse(localStorage.getItem("user"));
        })
        .catch((err) => {
          commit("setStatus", "error_login");
          console.log(err);
        });
    },
    changeInfos: async ({ commit }, userInfos) => {
      commit;
      const formData = new FormData();
      let userId = userInfos.userId;
      let imageFile = userInfos.image;
      let bio = userInfos.bio;
      let role = userInfos.role;
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("userId", userId);
      formData.append("bio", bio);
      formData.append("role", role);
      await instance
        .put("/user/userInfo", formData, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    likePost: async ({ commit }, likeInfos) => {
      commit("clearLikes");

      await instance
        .post(`/posts/${likeInfos.postId}/likes`, likeInfos)
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    postComment: async ({ commit }, commentInfos) => {
      commit;
      await instance
        .post(`/posts/${commentInfos.postId}/comment`, commentInfos, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getOneUserInfos: async ({ commit }, userId) => {
      commit;                                        //fonction to get user infos in userInfos view
      await instance
        .get(`/user/userInfo/${userId}`)
        .then((response) => {
          commit("changeInfo", response.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteAccount: async ({ commit }, userId) => {
      commit;
      await instance
        .delete(`/user/userInfo/${userId}`, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changePost: async ({ commit }, postInfos) => {
      commit;
      const formData = new FormData();
      let postId = postInfos.postId;
      let imageFile = postInfos.image;
      let content = postInfos.content;

      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("postId", postId);
      formData.append("content", content);

      await instance
        .put(`/posts/${postInfos.postId}`, formData, {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((response) => {
          response.data.bpi;
        });
    },
    logout: async ({ commit }) => {
      commit("logout");
    },
  },

  modules: {},
});
