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
  box-sizing: border-box;
  display: flex;
 padding-bottom: 17rem;
  justify-content: center;
    .btn-submit{
        height: 2rem;
        width: 16rem;
        border-radius: 10px;
        background-color: rgb(224, 116, 116);
        &:hover{
          cursor: pointer;
          
        }
    }
    .btn-submit2{
      height: 2rem;
        width: 10rem;
        border-radius: 10px;
        background-color: rgb(224, 116, 116);
        &:hover{
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
