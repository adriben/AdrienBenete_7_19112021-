<template>
    <div class="sugestions">
     <h3>Suggestions</h3>
     <ul>
         <li v-for="user in users" :key="user.username" class="user">
             <img v-if="user.image" :src="user.image" alt="">
             {{ user.username }}
           

         </li>
         
     </ul>

    </div>
</template>

<script>



 export default{
    name: "Suggestion",
    data (){
        return {
            users: [],
        }
    } 
     ,
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
.sugestions{
    background-color: rgb(7, 165, 7);
    
   li{
       list-style: none;
       display: flex;
       padding: .5rem;
   }
    img{
        max-width: 70px;
    }
}
</style>
