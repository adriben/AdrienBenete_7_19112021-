<!--section where we can see the user's own profile-->

<template>
  <div class="user-infos">
    <TheHeader userName="$user.username"></TheHeader>
    <h1>My profile</h1>
    <br />
    <br />
    <div class="info-container">
      <div class="image-details">
        <h2>Profile Picture</h2>
        <img
          v-if="user.imageProfile"
          :src="user.imageProfile"
          alt=""
          class="profil-picture"
        />
        <img
          v-else
          src="../assets/anonymous.png"
          alt=""
          class="profil-picture"
        />
        <form action="">
          <label v-if="user.imageProfile" for="avatar"
            >Update your profile picture
          </label>
          <label v-else for="avatar">Choose a profile picture: </label>

          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            class="btn"
          />
          <br /><br />
          <input
            type="submit"
            @click="changeImage"
            class="btn btn-submit"
            value="Submit"
          />
        </form>
      </div>

      <div class="details">
        <h2>My details</h2>

        <h3>
          {{ user.username }}
        </h3>

        <div class="select-role">
          <label>Your role: </label>
          <select type="select" class="select">
            <option valeur="default">{{ this.$store.state.user.role }}</option>
            <option valeur="ow">Office worker</option>
            <option valeur="cs">Customer Support</option>
            <option valeur="hr">Human Ressourse</option>
            <option valeur="ac">Accounting</option>
            <option valeur="Man">Management</option>
            <option valeur="Man">IT team</option>
          </select>
        </div>
        <br />
        <br />
        <form action="" class="bio">
          <label for="#username" class="bio-title">Bio </label>
          <br />
          <p v-if="this.$store.state.user.bio != 'null'">
            {{ this.$store.state.user.bio }}
          </p>
          <label for="textarea">Edit your bio</label>
          <textarea name="bio" id="textarea" cols="55" rows="7" v-model="bio">
          </textarea>
          <br />
          <input
            type="submit"
            class="btn btn-submit2"
            value="Change"
            @click="changeImage"
          />
        </form>
        <br />
        <button class="danger" @click="deleteAccount">
          Delete this Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      image: "",
      bio: "",
    };
  },
  components: {
    TheHeader: TheHeader,
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: function () {
    this.getUserInfo();
    if (  //if the user is not connected his userId is -1 in the store
      this.$store.state.user.userId === -1 ||
      this.$store.state.user.userId == undefined
    ) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    changeImage: function (event) { //method to update the profile of the user
      event.preventDefault();
      this.$store
        .dispatch("changeInfos", {
          userId: this.$store.state.user.userId,
          image: document.querySelector("input[type=file]").files[0],
          bio: this.bio || this.$store.state.user.bio,
          role: document.querySelector(".select").value,
        })
        .then(() => {
          this.getUserInfo();
        });
    },
    getUserInfo: async function () {
      let userId = this.$store.state.user.userId;
      this.$store.dispatch("getOneUserInfos", userId);
    },
    deleteAccount: async function () {
      let confirmation = confirm(
        "Are you sure you want to delete this account? All your posts, pictures and information will be deleted"
      );

      if (confirmation) {
        let userId = this.$store.state.user.userId;
        this.$store
          .dispatch("deleteAccount", userId)
          .then(this.$store.commit("logout"))
          .then(this.$router.push("/"));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$color-primary: #3bb78f;
$color-secondary: #3bb78f;
.user-infos {
  width: 100%;
  h1 {
    padding-top: 8rem;
  }
}
.info-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .image-details { //left section of the page where the picture is located
    border-radius: 10px;
    padding: 2rem;
    margin-left: 3rem;
    background-color: white;
    height: 500px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    img {
      max-width: 20rem;
      max-height: 20rem;
    }
    form {
      padding-top: 2rem;
    }
  }
  .details { //right section of the page
    border-radius: 10px;
    padding: 2rem;
    margin-right: 5rem;
    background-color: white;
    height: 500px;
    width: 450px;
    border-left: rgba(128, 128, 128, 0.493) 1px solid;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    @media screen and (max-width: 900px) {
      width: 420px;
      border-radius: 0;
      margin-left: 5rem;
    }
    @media screen and (max-width: 500px) {
      width: 250px;
      margin-right: 5rem;
    }

    #username {
      height: 2rem;
      border-radius: 10px;
      font-weight: bold;
      font-size: 1rem;
    }
    .select-role {
      padding-top: 1rem;
      float: left;
      .select {
        font-size: 105%;
      }
    }
    .bio {
      padding-top: 0.3rem;
    }
    .bio-title {
      color: #1e8665;
    }
  }
  .danger {
    background-color: rgb(155, 22, 22);
    height: 2rem;
    border-radius: 20px;
    float: right;
    color: white;
  }
}

@media screen and (max-width: 900px) {
  .info-container {
    flex-direction: column;
    margin: 0;
    .image-details {
      margin-left: 0rem;
      margin-right: 0;
    }
    #textarea {
      width: 150px;
    }
  }
}

@media screen and (max-width: 500px) {
  .image-details {
    width: 250px;
    img {
      width: 10rem;
    }
  }
}
</style>
