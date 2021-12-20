<template>
  <div class="user-profile">
    <TheHeader userName="$user.username"></TheHeader>
    <h1>{{ this.user.username }}'s details</h1>

    <div class="details-container">
      <img :src="this.user.image" alt="profile picture" />
      <h2>{{ user.role }}</h2>
      <h3>{{ user.email }}</h3>
      <p v-if="user.bio != 'null'">{{ user.bio }}</p>
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
      user: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted: async function () {
    this.getUserInfo();
    if (
      this.$store.state.user.userId === -1 ||
      this.$store.state.user.userId == undefined
    ) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    getUserInfo: async function () {
      return fetch(
        `http://localhost:5000/api/user/userInfo/${this.$route.params.userId}`
      )
        .then((responsehttp) => {
          return responsehttp.json();
        })
        .then((data) => {
          this.user = data.user;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.user-profile {
  width: 100%;
  h1 {
    padding-top: 7rem;
  }
  .details-container {
    width: auto;
    justify-content: center;
    align-items: center;

    p {
      padding: 0 3rem;
    }
    img {
      width: 400px;
      height: 400px;
      object-fit: cover;
    }
  }
}
</style>
