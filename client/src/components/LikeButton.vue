<template>


    <i @click="likePost" class="far fa-heart"></i>
    
   
</template>

<script>
import { mapState } from 'vuex';

export default{
    
    name: "LikeButton",
    props: {
        postId: Number,
        Likes: Number
    },
    computed: {
         ...mapState(['user'])
    },
    methods: {
    likePost: async function(){
       this.$store.dispatch('likePost',{
        userId: this.$store.state.user.userId,
        postId: this.postId
        
      }).then(() => {
        
        this.getPosts()
        
    })
        },
        getPosts(){
            this.$parent.getPosts()
        }
    }
}
</script>

<style scoped>

</style>
