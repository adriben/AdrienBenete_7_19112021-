<template>
    
    <div class="main-page">
     <TheHeader userName="$user.username"></TheHeader>
     <section class="content">

         <div class="the-wall">
         <form action="">
         <input type="text" :placeholder="'What\'s up' + ' ' + user.username" class='write-post' v-model="newPost">
         <input type="file"
       id="post-picture" name="postPicture"
       accept="image/png, image/jpeg">
         <input type="submit" @click="postPost" >
         
      
         
         </form>

         <div>
            <br><br>
             <ul>
                 <li v-for="post in posts" :key="post.content">{{ post.content }}</li>
             </ul>
         </div>

      </div>

     <aside>
         Follow
     </aside>
     </section>
     
    </div>
        

  
    
</template>

<script>
import  TheHeader  from '../components/TheHeader.vue';
import { mapState } from 'vuex';

export default {
    components: {
      "TheHeader": TheHeader
    },
    mounted: async function (){
        this.getPosts()
        
         if(this.$store.state.user.userId === -1){
            this.$router.push('/');
           return
         }
        

    },
    
    data(){
        return{
            posts: [],
            newPost: ''
        }
    },
    computed: {
        ...mapState(['user']),
    }, 
    methods: {
         getPosts: async function(){
             
            return fetch ("http://localhost:5000/api/posts") 
            .then((responsehttp) => {
      return responsehttp.json();
    })
    .then((data) => {
        
        this.posts = data.posts
    })
    .catch((err) => {
      console.log(err)
    });
  },
     postPost: async function(event){
         event.preventDefault()
         let Post ={
             content: this.newPost
         }
          fetch ("http://localhost:5000/api/posts",
         {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Post),
  }) 
     this.newPost = '';
     setTimeout(this.getPosts(), 1000) 
     }
     
         
         
         }
}
</script>

<style lang="scss" scoped>
.main-page{
    width: 100%;
    .content{
    background-color: white;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 25px;
    width: 100%;
    list-style: none;
    }
 .write-post{
     width: 30rem;
     margin-top: 2rem;
 }
 li{
     list-style: none;
 }
}

</style>
