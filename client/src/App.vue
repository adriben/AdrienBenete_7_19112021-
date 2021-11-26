<template>
  
    
    <router-view/>
    

  
</template>

<script>



export default ({
  name: 'app',
  components: {
    
  }
  })
</script>


<style lang="scss">


#app {
  font-family: 'Oswald', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
 padding-bottom: 17rem;
  justify-content: center;
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
