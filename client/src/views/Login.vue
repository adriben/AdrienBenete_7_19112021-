<template>
  <div class="first-page">
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>Welcome to Groupomania</h1>
      <h2>Login</h2>
      <form>
        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          name="username"
          id="username"
        />
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          name="password"
          id="password"
        />
        <button @click="login">Login</button>
        <p class="incorrect-password">{{ incorrectInfos }}</p>
      </form>
      <router-link to="/signUp" class="link"
        >No account yet? Click here to sign up
      </router-link>
    </div>
    <div class="home-picture">
      <img src="../assets\Daco_5615604.png" alt="social media png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      username: "",
      password: "",
      incorrectInfos: "",
    };
  },

  methods: {
    login: function (event) {
      event.preventDefault();
      this.$store
        .dispatch("loginAccount", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          if (
            this.$store.state.user.userId !== -1 ||
            !this.store.state.user.userId
          ) {
            this.$router.push("/main");
            return;
          }
        })
        .catch(() => {
          console.log("error");
          this.incorrectInfos = "Invalid username/password";
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.first-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home {
  img {
    width: 80px;
  }
  margin-top: 8rem;
  padding-top: 1rem;
  background-color: white;

  display: flex;
  flex-direction: column;
  width: 30rem;
  height: 35rem;
  align-items: center;

  border: solid 2px rgba(0, 0, 0, 0.356);
  border-radius: 20px;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
  form {
    display: flex;
    flex-direction: column;
    input {
      width: 16rem;
      height: 2rem;
    }

    button {
      margin-top: 1rem;
      background-color: #3bb78f;
      border-radius: 30px;
      height: 2rem;
      cursor: pointer;
    }
  }
}
.incorrect-password {
  color: rgb(196, 26, 26);
  font-size: 90%;
}

.home-picture {
  img {
    width: 550px;
    margin-top: 10rem;
    padding-top: 1rem;
  }
}
@media screen and (max-width: 1150px) {
  .first-page {
    grid-template-columns: 1fr;
  }
  .home-picture {
    display: none;
  }
}

@media screen and (max-width: 520px) {
  .home {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 60rem;
    border: none;
    box-shadow: none;
    background-color: rgba($color: #f3f8ee, $alpha: 1);
  }
}
</style>
