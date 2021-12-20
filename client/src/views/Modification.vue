<template>
  <div class="modifications">
    <The-header></The-header>
    <div class="post">
      <form
        action=""
        v-if="
          this.$store.state.user.userId == this.post.userId ||
          this.$store.state.user.isAdmin
        "
      >
        <img
          :src="this.post.image"
          alt="profile picture"
          v-if="this.post.image"
        />
        <br />
        <label for="changePicture">Change picture</label>
        <input
          type="file"
          name="changePicture"
          accept="image/png, image/jpeg"
        />
        <br />
        <textarea
          class="post-content"
          name="bio"
          id=""
          cols="55"
          rows="7"
          :value="post.content"
        >
        </textarea>

        <br />
        <br />
        <input
          type="submit"
          class="btn btn-submit2"
          value="Change"
          @click="changePost"
        />
      </form>

      <p v-else class="error-message">You can only modify your own posts</p>
    </div>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import { mapState } from "vuex";

export default {
  components: {
    TheHeader: TheHeader,
  },
  data() {
    return {
      post: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: async function () {
    this.getPostInfo();
     if (
      this.$store.state.user.userId === -1 ||
      this.$store.state.user.userId == undefined
    ) {
      this.$router.push("/");
      return;
    }
    
  },
  methods: {
    getPostInfo: async function () {
      return fetch(
        `http://localhost:5000/api/posts/${this.$route.params.postId}`
      )
        .then((responsehttp) => {
          return responsehttp.json();
        })
        .then((data) => {
          this.post = data.post;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePost: function (event) {
      event.preventDefault();

      this.$store
        .dispatch("changePost", {
          postId: this.$route.params.postId,
          image: document.querySelector("input[type=file]").files[0],
          content: document.querySelector(".post-content").value,
        })
        .then(() => {
          this.$router.push("/main");
        });
    },
  },
};
</script>

<style scoped lang="scss">
.modifications {
  width: 100%;
  img {
    width: 600px;
    max-height: 600px;
    object-fit: cover;
  }
  .post {
    padding-top: 15rem;

    .post-content {
      font-size: 110%;
      margin-top: 1.5rem;
    }
  }
  .error-message {
    color: red;
    font-size: 140%;
  }
}
</style>
