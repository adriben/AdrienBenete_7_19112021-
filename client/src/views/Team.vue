<template>

    <div class="team">
        <TheHeader userName="$user.username"></TheHeader>
        <h1>The Team</h1>

        <ul>
         <li v-for="user in users" :key="user.username" class="user">
             <img v-if="user.image" :src="user.image" alt="">
             <img v-else src="../assets/anonymous.png" alt="" class="profil-picture" >
             <h3 class="username">{{ user.username }}</h3>
             <p>{{ user.role }}</p>
           

         </li>
         
     </ul>
      
    </div>


    
</template>

<script>
import  TheHeader  from '../components/TheHeader.vue';
import { mapState } from 'vuex';

export default {
    
    components: {
      "TheHeader": TheHeader
    },
    data (){
        return {
            users: [],
        }
    } ,
    
    computed: {
        ...mapState(['user']),
    },
     mounted: async function (){
        this.getUsers()
    },
    methods: {
        getUsers: async function(){
             
            return fetch ("http://localhost:5000/api/user") 
            .then((responsehttp) => {
      return responsehttp.json();
    })
    .then((data) => {
        console.log(data);
        
        this.users = data.users
    })
    .catch((err) => {
      console.log(err)
    });
  }
         
    }
   
    }

</script>
<style lang="scss" scoped>

.team{
    width: 100%;
    h1{
        padding-top: 7rem;
    }
    ul{
        padding-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        
       
    }
     li{
       list-style: none;
       display: flex;
       width: 200px;
       flex-direction: column;
       align-items: center;
       padding: 3rem;
       background-color: white;
       border-radius: 20px;
       margin: 1rem;

       .username{
           padding: 0 0 1rem 0;
       }

   }
    img{
        width: 170px;
        height: 170px;
        object-fit: cover;

    }
}




</style>