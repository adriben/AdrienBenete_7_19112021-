<template>
  <router-view />
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style lang="scss">

$color-primary: #3bb78f;
body {
  box-sizing: border-box;
  margin: 0;
}
#app {
  background-color: rgba($color: #f3f8ee, $alpha: 1);
  font-family: "Oswald", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  padding-bottom: 17rem;
  justify-content: center;
  .btn-submit {
    height: 2rem;
    width: 16rem;
    border-radius: 10px;
    background-color: $color-primary;
    &:hover {
      cursor: pointer;
    }
  }
  .btn-submit2 {
    color: black;
    height: 2rem;
    width: 10rem;
    border-radius: 10px;
    background-color: $color-primary;
    &:hover {
      cursor: pointer;
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
