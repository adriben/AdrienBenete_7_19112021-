<template>


    <i @click="likePost" class="far fa-heart"></i>
    
   
</template>

<script>
export default{
    name: "LikeButton",
    props: {
        postId: Number,
        Likes: Number
    },
    methods: {
        likePost: async function(){
            return fetch (`http://localhost:5000/api/posts/${this.postId}/likes`,
             {
             method: "PUT"
             }) 
            .then((responsehttp) => {
      return responsehttp.json();
    })
    .then(() => {
        console.log('Post liked');
        
        
    })
    .catch((err) => {
      console.log(err)
    })
        }
    }
}
</script>

<style scoped>

</style>
