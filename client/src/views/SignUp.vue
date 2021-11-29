<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to Groupamia</h1>
    <p>Sign-up</p>
      <form>
      <input type="email" placeholder="Email address" v-model="email">
      <input type="text" placeholder="Username" v-model="username">
      <input type="password" placeholder="Password" v-model="password">
      <input type="password" placeholder="Confirm password" v-model="confirmedPassword">
      <button @click="signIn">Sign-up</button>

    </form>
      <router-link to="/" class="link">Already an account? Click here to login </router-link>
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
      confirmedPassword: ''
    }
  },
  methods: {
    signIn: function(event){
      event.preventDefault();
      this.$store.dispatch('createAccount',{
        email: this.email,
        username: this.username, 
        password: this.password
      })


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
   border-radius: 20px;
    box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.192);
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
       border-radius: 30px;
       
     }

    }
}

img{
  width: 80px

}
.link{
  padding-top: 1rem;
  padding-bottom: 20rem ;
}

</style>
