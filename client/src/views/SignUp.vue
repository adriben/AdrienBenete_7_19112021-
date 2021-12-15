<template>
  <div class="first-page">
    <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Groupomania</h1>
    <h2>Sign-up</h2>
      <form>
        <label for="email">Your email</label>
      <input type="email" placeholder="Email address" v-model="email" name="email" id="email">
      <label for="usernameSignup">Your username</label>
      <input type="text" placeholder="Username" v-model="username" name="usernameSignup" id="usernameSignup">
      <label for="passwordSignup">Password</label>
      <input type="password" placeholder="Password" v-model="password" name="passwordSignup" id="passwordSignup" >
      <label for="confirmePassword">Confirm password</label>
      <input type="password" placeholder="Confirm password" v-model="confirmedPassword" name="confirmePassword" id="confirmePassword">
      <button @click="signIn">Sign-up</button>

    </form>
    <p class="errorMessage">{{ errorMessage }}</p>
      <router-link to="/" class="link">Already an account? Click here to login </router-link>
      </div>
      <div class="home-picture">
         <img src="../assets\Daco_5615604.png" alt="social media png">
      </div>
  </div>
</template>

<script>

export default {
  name: "Signup",
  data: function (){
    return{
      email: '',
      username: '',
      password: '',
      confirmedPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    signIn: async function (event){
      event.preventDefault();
      if (
        this.username != '' &&
        this.email != '' &&
        this.password != '' &&
        this.confirmedPassword === this.password
      ) {
        
        this.$store.dispatch('createAccount',{
        email: this.email,
        username: this.username, 
        password: this.password
      }).then(()=> {
        this.$router.push('/main')
      })
      } else if(this.confirmedPassword != this.password){
        this.errorMessage = 'Both password must match'
      } else{
        this.errorMessage = 'Please fill up all the fields'
      }
      
    
     
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
  .errorMessage{
       color: rgb(196, 26, 26);
       font-size: 90%;
     }
   margin-top: 8rem;
   padding-top: 1rem;
   background-color: white;
   display: flex;
   flex-direction: column;
   width: 30rem;
   height: 45rem;
   align-items: center;
   border: solid 2px rgba(0, 0, 0, 0.356);
   border-radius: 20px;
    box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
    img{
  width: 80px

}
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
       background-color: #3bb78f ;
       border-radius: 30px;
       height: 2rem; 
     }
    }
}
.home-picture{
  img{
     width: 550px;
      margin-top: 10rem;
  padding-top: 1rem;
  }
}
.link{
  padding-top: 1rem;
  padding-bottom: 20rem ;
}
@media screen and (max-width: 1150px){

  .first-page{
   grid-template-columns: 1fr;
  }
 .home-picture{
   display: none;
 }
}

@media screen and (max-width: 520px){
     .home{
      padding: 0;
      margin: 0;
       width:100%;
       height: 60rem;
       border: none;
       box-shadow: none;
       background-color: rgba($color: #f3f8ee, $alpha: 1.0);
     }
}

</style>
