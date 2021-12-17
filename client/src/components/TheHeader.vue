<template>
  <header>
    <div>
      <router-link to="/main" class="link">
        <img
          src="../assets/icon-left-font-monochrome-white.png"
          alt="logo groupamia"
        />
      </router-link>
    </div>
    <nav>
      <ul>
        <router-link to="/team" class="link header-link">
          <li class="header-link">
            <i class="fas fa-users"></i><span class="legende">Team</span>
          </li>
        </router-link>

        <router-link to="/userinfos" class="link">
          <li v-if="user.imageProfile">
            <img
              :src="user.imageProfile"
              alt="profile picture"
              class="profil-picture"
            />
          </li>
          <li v-else>
            <img
              src="../assets/anonymous.png"
              alt="anonymous profile picture"
              class="profil-picture"
            />
          </li>
        </router-link>

        <router-link to="/" class="link header-link">
          <li class="header-link">
            <i class="fas fa-power-off" @click="clearStorage"></i
            ><span class="legende">Logout</span>
          </li>
        </router-link>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "TheHeader",
  computed: {
    ...mapState(["user"]),
  },
  props: {
    imageSrc: String,
  },
  methods: {
    clearStorage() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style lang="scss">
header {
  position: fixed;
  z-index: 5;
  background-color: #3bb78f;
  background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 2rem;
  height: 8rem;
  .link {
    text-decoration: none;
    color: white;
  }
  .header-link {
    display: flex;
    flex-direction: column;
  }

  img {
    width: 300px;
    margin-left: 2rem;
    margin-top: -4.5rem;
  }
  ul {
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0 2rem 0 0;
    li {
      padding: 1rem;
      transition: transform 0.3s;

      .legende {
        font-size: 50%;
        display: none;
        margin-top: 0rem;
      }
      &:hover {
        transform: scale(1.3);
        transition: transform 0.3s;
        .legende {
          display: flex;
        }
      }
      .profil-picture {
        width: 5.5rem;
        height: 5.5rem;
        object-fit: cover;
        margin-top: 0;
        margin-right: 2rem;
        margin-left: 0;
        border-radius: 50px;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  header {
    flex-direction: column;
    padding: 0;
    height: 10rem;
    img {
      padding: 0;
      margin-top: -7rem;
      @media screen and (max-width: 350px) {
        width: 6rem;
        margin-top: -2rem;
      }
    }
    ul {
      justify-content: center;
      margin-top: -9rem;
    }
  }
}
</style>
