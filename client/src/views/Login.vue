<template>
  <div class="first-page">
    <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Groupomania</h1>
    <p>Login</p>
      <form>
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="login">Login</button>
      <!-- <p v-if="status == 'error_login'">Erreur</p> -->

    </form>
      <router-link to="/signUp" class="link">No account yet? Click here to sign up </router-link>
      </div>
      <div class="home-picture">
         <img src="../assets\Daco_5615604.png" alt="social media png">
      </div>
      
 
  </div>
  
</template>

<script>



export default {
  name: "Login",
  data: function(){
    return{
      username: "",
      password: "",
    }
  },
  methods: {
     login: function(event){
       event.preventDefault()
       this.$store.dispatch('loginAccount',{
        username: this.username, 
        password: this.password,
        imageUrl: this.image
        
      })
      .then(() => {
      
         if(this.$store.state.user.userId  != -1){
      this.$router.push('/main');
      return
    }
      })
     }
  }

  
}
</script>
<style lang="scss" scoped>
.first-page{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.home{
   img{
  width: 80px

}
  margin-top: 8rem;
  padding-top: 1rem;
  background-color: white;
  
   display: flex;
   flex-direction: column;
   width: 30rem;
   height: 30rem;
    align-items: center;

   border: solid 2px rgba(0, 0, 0, 0.356);
    border-radius: 20px;
    box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
    form{
      display: flex;
      flex-direction: column;
      input{
        margin-top: 1rem;
        width: 16rem;
        height: 2rem;
      }
     
     button{
       margin-top: 1rem;
       background-color:	#3bb78f;
       border-radius: 30px;
       height: 2rem;
       
     }
    }
}


.link{
  padding-top: 4rem;
}
.home-picture{
  img{
     width: 550px;
      margin-top: 10rem;
  padding-top: 1rem;
  }
 
}

</style>


