<template>
  <div class="notification">
    <The-header></The-header>
    <h1>Notification menu</h1>
  </div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";

export default {
  components: {
    TheHeader: TheHeader,
  },
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  h1 {
    padding-top: 7rem;
  }
}
</style>
