<template>

    <div class="user-infos">
        <TheHeader userName="$user.username"></TheHeader>
        <h1>My profile</h1>
        <br>
        <br>
        <div class="info-container">
        <div class="image-details">
            <h2>Profile Picture</h2>
           <img v-if=" user.imageProfile " :src="user.imageProfile" alt="" class="profil-picture" >
            <img v-else src="../assets/anonymous.png" alt="" class="profil-picture" >
        <form action="">
    <label v-if="user.imageProfile" for="avatar">Update your profile picture </label>
   <label v-else for="avatar">Choose a profile picture: </label>
  

<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" class="btn">
       <br><br>
       <input type="submit" @click="changeImage" class="btn btn-submit">
</form>
 </div>
 <div class="details">
     <h2>My details </h2>
     <form action="">
  <label for="#username">Username </label>
    <input type="text" id="username" name="username" :placeholder="user.username">
     <input type="submit"  class="btn btn-submit2" value="Change">

     </form>
     <br>
     <form action="" class="bio">
  <label for="#username">Bio </label>
  <br>
    <textarea name="" id="" cols="40" rows="10"></textarea>
    <br>
     <input type="submit"  class="btn btn-submit2" value="Change">

     </form>
     <br>
     <p>Followers: 0</p>
     <p>Following: 0</p>
     
     
    

 </div>
 </div>
    </div>


    
</template>

<script>
import  TheHeader  from '../components/TheHeader.vue';
import { mapState } from 'vuex';

export default {
    data(){
       return{
           image: ''
       }
    },
    components: {
      "TheHeader": TheHeader
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        changeImage: function(event){
       event.preventDefault()

       this.$store.dispatch('changeInfos',{
        userId: this.$store.state.user.userId,
        image:document.querySelector('input[type=file]').files[0]
       
        
      }) 
      
     }

    }
}
</script>
<style lang="scss" scoped>
 $color-primary: 	#3bb78f;
$color-secondary: 	#3bb78f;
.user-infos{
    width: 100%;
}
.info-container{
    display: flex;
    justify-content: space-around;
    
    .image-details{
        
        border-radius: 10px;
        padding: 2rem;
        margin-left: 3rem;
        background-color: white;
        
        img{
          max-width: 20rem;
        }
        form{
            padding-top: 2rem;
        }
    }
    .details{
        border-radius: 10px;
        padding: 2rem;
        margin-right: 5rem;
        background-color: white;
     #username{
         height: 2rem;
         border-radius: 10px;
         font-weight: bold;
         font-size: 1rem;
     }
     .bio{
         padding-top: 2rem;
     }
    }
   
}


</style>
