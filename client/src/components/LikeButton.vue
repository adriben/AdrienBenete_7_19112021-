<template>

<i  @click="likePost(); checkIfLiked()" class="far fa-heart"></i>


    




    
    
    
   
</template>

<script>
import { mapState } from 'vuex';

export default{
    
    name: "LikeButton",
    props: {
        postId: Number,
        Likes: Number
    },
    data(){
        return{
            posts: this.$parent.posts,
        }
    },
    computed: {
         ...mapState(['user']),
    },
    
    mounted: async function (){
       this.getLikesByUser()
        
        
         },
    methods: {
    likePost: async function(){
       this.$store.dispatch('likePost',{
        userId: this.$store.state.user.userId,
        postId: this.postId 
      }).then(() => {
           this.getPosts()
           this.getLikesByUser()
          this.checkIfLiked()
        
         
         
         
         

    
        
    })
     },
     getLikesByUser: async function(){

         this.$store.dispatch('getLikesByUser', {
             userId: this.$store.state.user.userId
         })
          
     },
     getPosts(){
            this.$parent.getPosts()
        },
        checkIfLiked(){
            this.$parent.checkIfLiked()
        },

    getPostLiked(){
        
            
    }

    
    }
}
</script>

<style scoped>

</style>
