<template>
    <div>
       <form action="">
           <input type="text" v-model="this.newComment" placeholder='Type your comment...'>
           <input type="submit" @click="postComment">
       </form>
    </div>
</template>

<script>
export default{
    name: "Comment",
    props: {
        postId: Number
       
    },
    data(){
        return{
            newComment: "",
           
        }
    },
    methods: {
        postComment: async function(event){
         event.preventDefault()
        this.$store.dispatch('postComment',{
        content: this.newComment,
        userId: this.$store.state.user.userId,
        postId: this.postId,
         
      })
        console.log(this.newComment);
    
     },
     
   
         
     
    }

    
}


</script>
