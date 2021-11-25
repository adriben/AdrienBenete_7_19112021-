<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Groupamia</h1>
    <p>Login</p>
      <form>
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="login">Login</button>

    </form>
      <router-link to="/signUp" class="link">No account yet? Click here to sign up </router-link>
  </div>
</template>

<script>

export default {
  name: "Login",
  data: function(){
    return{
      username: "",
      password: ""
    }
  },
  methods: {
     login: function(event){
       event.preventDefault()
       console.log(this.username, this.password);
     }

  }
  
}
</script>
<style lang="scss" scoped>
.home{
  margin-top: 8rem;
  padding-top: 1rem;
  background-color: white;
  
   display: flex;
   flex-direction: column;
   width: 30rem;
   height: 30rem;
    align-items: center;

   border: solid 2px rgba(0, 0, 0, 0.356);
    form{
      display: flex;
      flex-direction: column;
      input{
        margin-top: 1rem;
        width: 16rem;
      }
     button{
       margin-top: 1rem;
       background-color: #fdc6b5b6 ;
       
     }
    }
}

img{
  width: 80px

}
.link{
  padding-top: 5rem;
}

</style>


