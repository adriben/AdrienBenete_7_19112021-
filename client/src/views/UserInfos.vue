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
     <div class="select-role">
     <label>Your role: </label>
     <select type="select" class="select">
    <option valeur="default">{{ this.$store.state.user.role }}</option>
   <option valeur="ow">Office worker</option>
   <option valeur="cs">Customer Support</option>
   <option valeur="hr">Human Ressourse</option>
   <option valeur="ac">Accounting</option>
   <option valeur="Man">Management</option>
   <option valeur="Man">IT team</option>
    </select>
    </div>
     <br>
     <br>
     <form action="" class="bio">
  <label for="#username" class="bio-title">Bio </label>
  <br>
  <p>{{ this.$store.state.user.bio }}</p>
    <textarea name="bio" id="" cols="55" rows="7"  v-model="bio" > </textarea>
    
    
    <br>
     <input type="submit"  class="btn btn-submit2" value="Change" @click="changeImage">

     </form>
     <br>
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
           image: '',
           bio: '', 
       }
    },
    components: {
      "TheHeader": TheHeader
    },
    computed: {
        ...mapState(['user'])
    },
    mounted: function (){
            this.getUserInfo()
    },
    methods: {
        changeImage: function(event){
       event.preventDefault()
       console.log(this.role);
        
       this.$store.dispatch('changeInfos',{
        userId: this.$store.state.user.userId,
        image:document.querySelector('input[type=file]').files[0],
        bio: this.bio || this.$store.state.user.bio,
        role: document.querySelector('.select').value
      }).then(() => {
          this.getUserInfo()
      })      
     },
       getUserInfo: async function(){
           console.log('nous allons recuperer les infos');
           let userId = this.$store.state.user.userId;
           this.$store.dispatch('getOneUserInfos', userId)
       }
    }
}
</script>
<style lang="scss" scoped>
 $color-primary: 	#3bb78f;
$color-secondary: 	#3bb78f;
.user-infos{

    width: 100%;
    h1{
        padding-top: 7rem;
    }
}
.info-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    
    .image-details{
        
        border-radius: 10px;
        padding: 2rem;
        margin-left: 3rem;
        background-color: white;
        height: 500px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        
        img{
          max-width: 20rem;
          max-height: 20rem;
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
        height: 500px;
        width: 450px;
        border-left: rgba(128, 128, 128, 0.493) 1px solid;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

     #username{
         height: 2rem;
         border-radius: 10px;
         font-weight: bold;
         font-size: 1rem;
     }
     .select-role{
         padding-top: 1rem;
         float: left;
         .select{
         font-size: 105%;
         }
     }
     .bio{
         padding-top: .3rem;
         
     }
     .bio-title{
         color: $color-primary ;
     }
    }
   
}


</style>
