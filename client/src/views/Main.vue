<template>
    
    <div class="main-page">
     <TheHeader userName="$user.username"></TheHeader>
     <section class="content">

         <div class="the-wall">
         <form action="">
         <input type="text" :placeholder="'What\'s up' + ' ' + user.username" class='write-post' v-model="newPost">
         <label class="custom-button">
         <input type="file"
       id="post-picture" name="postPicture"
       accept="image/png, image/jpeg">
       <i class="far fa-image"></i>
       </label>
       <br>
         <input type="submit" @click="postPost" class="btn-submit" >
         </form>
 
         <div>
            <br><br>
        
             <ul>
                 <li v-for="post in posts.slice().reverse()" :key="post.content" class="post">
                     <div>
                         <div class="author">
                             <div class="author-info">
                      <img v-if="post.User.image" :src="post.User.image" alt="profile picture" class="profile-pic"><h3> By <span class="user-signature">{{ post.User.username}}</span></h3>
                        </div>
                        <p class="date">{{ moment(post.createdAt).fromNow() }}</p>
                         </div>
                     <img v-if="post.image" :src="post.image" alt=""><p>{{ post.content }} </p>
                    
                     <div class="icones">
                         <i class="far fa-comment-dots"></i>
                         <Like-button v-if="Object.values(this.alreadyLiked).includes(post.id)" :postId="post.id" class="red" @click="checkIfLiked"></Like-button>
                         <Like-button v-else :postId="post.id"></Like-button>
                         <span class="like-number">{{ post.likes }}</span>

                     </div>

                     {{ post.User.userId }}
                     <div v-if="this.$store.state.user.userId === post.User.id" class="personal-icone">
                       <Delete-button :postId="post.id"></Delete-button>

                     </div>
                     
                     </div>
                     </li>
             </ul>
             
         </div>

      </div>
     </section>
     
    </div>
    
</template>

<script>
import  TheHeader  from '../components/TheHeader.vue';
import { mapState } from 'vuex';
import moment from 'moment';
import DeleteButton from '../components/DeleteButton.vue';
import LikeButton from '../components/LikeButton.vue'

// import Suggestion from '../components/Suggestion.vue'

export default {
    components: {
      "TheHeader": TheHeader,
      "DeleteButton": DeleteButton,
      "LikeButton": LikeButton,
    //   "Suggestion": Suggestion
    },
    mounted: async function (){
        this.getPosts()
        this.checkIfLiked()   
        
         if(this.$store.state.user.userId === -1){
            this.$router.push('/');
           return
         }
    },
    
    data(){
        return{
            posts: [],
            newPost: '',
            postId: 0,
            moment: moment,
            postLiked: this.$store.state.postsLikedByUser,
            alreadyLiked: []
            
        }
    },
    computed: {
        ...mapState(['user', "postsLikedByUser"]),
        
    }, 
    methods: {
        
         getPosts: async function(){    
            await fetch ("http://localhost:5000/api/posts") 
            .then((responsehttp) => {
      return responsehttp.json();
    })
    .then((data) => {
        console.log(data.posts);   
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
         if(imageFile){
             formData.append('image', imageFile)}
        
          await fetch ("http://localhost:5000/api/posts",
         {
    method: "POST",
    body: formData,
  });
     this.newPost = '';
     this.getPosts()
     },
     checkIfLiked: async function(){
       
             for(let i = 0; i< this.postLiked.length; i++ ){
             this.alreadyLiked.push(this.postLiked[i].postId)
         }
         this.getPosts()
         
         
         
         
     },
         }
}
</script>

<style lang="scss" scoped>
 $color-primary: 	#3bb78f;
$color-secondary: 	#3bb78f;
.main-page{
    width: 100%;
    .content{
    width: 100%;
    list-style: none;
    }
 .write-post{
     width: 35rem;
     margin-top: 10rem;
     height: 3rem;
     border-radius: 10px;
     margin-bottom: 1rem;
 }
 input[type="file"] {
    display: none;
}
.custom-button{
    
    i{
        font-size: 250%;
        padding: 1rem 1rem 0 0 ;
        color: $color-primary;
        &:hover{
          cursor: pointer;
        }
    }
}

 li{
     list-style: none;
     padding: 0;
     width: 700px;
     border-radius: 20px;
     img{
         width: 700px;
         max-height: 500px;
         object-fit: cover;
     }
     
 }
 .post{
     padding-bottom: 3rem;
     border: solid 1px rgba(39, 44, 39, 0.404);
     margin: auto;
     margin-top: 1.5rem;
     background-color: white ;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
     .icones{
         display: flex;
         justify-content: center;
        i{
            padding: 1rem;
            font-size: 150%;
            &:hover{
          cursor: pointer;
          
        } 
        }
        .like-number{
            padding-top: 1.5rem;
            margin-left: -0.9rem;
            font-size: 75%;
        }
     }
 }
 .signature{
     float: right;
     padding-right: 1rem;
 }
 .author{
     display: flex;
     justify-content: space-between;
    .author-info{
        display: flex;
        h3{
            padding: 1rem;
        }
    }
    .date{
        font-weight: lighter;
        padding: 1rem;
        font-style: italic;
        font-size: 80%;
    }
 }
 .profile-pic{
         width: 80px;
         border-radius: 60px;
         padding: .5rem;
     }
 .user-signature{
     color: $color-primary;
     padding-bottom: 2rem;   
 }
 .red{
     background-color: red;
 }
 .white{
     background-color: white;
 }
}
</style>

