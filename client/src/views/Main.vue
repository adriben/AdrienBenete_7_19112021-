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
         <input type="submit" @click="postPost" class="btn-submit" >
         
      
         
         </form>

         <div>
            <br><br>
             <ul>
                 <li v-for="post in posts" :key="post.content" class="post"><div>
                     <img v-if="post.image" :src="post.image" alt=""><p>{{ post.content }} </p>
                     <div class="icones">
                         <i class="far fa-comment-dots"></i>
                         <i class="far fa-heart"></i>




                     </div>
                     
                     </div><p class="signature">By <span class="user-signature">{{ post.username }}</span></p>
                     </li>
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
         
         const formData = new FormData()
         const imageFile = document.querySelector('input[type=file]').files[0]
         formData.append('content', this.newPost)
         formData.append('userId', this.$store.state.user.userId)
         formData.append('username', this.$store.state.user.username)
         formData.append('image', imageFile)
         console.log(Array.from(formData));
        //  let Post ={
        //      content: this.newPost,
        //      userId: this.$store.state.user.userId,
        //      username:  this.$store.state.user.username,
        //      imageUrl: formData
        //  }
        //   console.log(Post);
          await fetch ("http://localhost:5000/api/posts",
         {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  });
     this.newPost = '';
     this.getPosts()
     
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
     height: 2rem;
     border-radius: 10px;
     margin-bottom: 1rem;
 }
 li{
     list-style: none;
     padding: 0;
     width: 700px;
     border-radius: 20px;
     img{
         max-width: 700px;
         border: 1px solid green;
         border-top-right-radius: 20px ;
         border-top-left-radius: 20px;
     }
 }
 .post{
     padding-bottom: 3rem;
     border: solid 1px rgba(40, 94, 38, 0.404);
     margin: 2rem;
     .icones{
         display: flex;
         justify-content: center;
        i{
            padding: 1rem;
            font-size: 150%;

        }
     }
 }
 .signature{
     float: right;
     padding-right: 1rem;
 }
 .user-signature{
     color: rgb(22, 175, 22);
     padding-bottom: 2rem;
    
 }
}

</style>
