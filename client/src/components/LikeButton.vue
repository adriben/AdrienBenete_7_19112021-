<template>

<i @click="likePost()" class=" fa-heart"></i>



   
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
            alreadyLiked: this.$parent.alreadyLiked,
        }
    },
    computed: {
         ...mapState(['user']),
    },
    
    mounted: async function (){
       this.getLikesByUser()
       setTimeout(() => {
           this.checkIfLiked()  
       }, 900);
       
         },
    methods: {
    likePost: async function(){
       this.$store.dispatch('likePost',{
        userId: this.$store.state.user.userId,
        postId: this.postId 
      }).then(() => {
          this.getLikesByUser()
           this.getPosts()
          
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
        }
    }
}
</script>

<style scoped>
.far{
    font-weight: lighter;
    position: absolute;
    top: 0px;
    right: 270px;
}

</style>
