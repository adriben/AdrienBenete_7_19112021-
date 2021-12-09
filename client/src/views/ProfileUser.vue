<template>

    <div class="user-profile">
        <TheHeader userName="$user.username"></TheHeader>
        <h1>PROFILE DE </h1>
      
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
            search: ''
        }
    } ,
    
    computed: {
        ...mapState(['user']),
        filteredList() {
            return this.users.filter(user => {
                return user.username.toLowerCase().includes(this.search.toLowerCase())
            })
        }
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

.user-profile{
    width: 100%;
    h1{
        padding-top: 7rem;
    }
}



</style>