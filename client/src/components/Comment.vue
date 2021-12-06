<template>
<div>
    <div class="comment-div">
        <i class="far fa-comment-dots comment-icone" @click="getComments"></i>
        <div v-if="commentFromPost" class="comment-section">
           <ul>
               <li v-for="comment in commentFromPost.slice().reverse()" :key="comment.content" class="comment">
                    <img v-if="comment.User.image" :src="comment.User.image" alt="profile picture" class="profile-pic"><p>
                         <span class="signature"> {{ comment.User.username}}:</span></p>
                   <p class="italique">  {{ comment.content }}</p>
               </li>
           </ul>
           
       </div>
       <form action="" class="type-comment">
           <input type="text" v-model="this.newComment" placeholder='Type your comment...' class="comment-input">
           <input type="submit" @click="postComment" class="comment-button">
       </form>
       
       </div>
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
            commentFromPost: []
           
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
      this.newComment = ""
      this.getComments()
    
     },
     getComments: async function(){
        //  e.target.classList.toggle('notHidden')
        await fetch(`http://localhost:5000/api/posts/${this.postId}/comment`)
        .then((response) => {
        return response.json(); }) 
        .then((data) => {
        console.log(data.comments);   
        this.commentFromPost = data.comments 
        
    })
    .catch((err) => {
      console.log(err)
    })
             
        
     }
     
   
         
     
    }

    
}


</script>

<style lang="scss" scoped>
$color-primary: 	#3bb78f;
$color-secondary: 	#3bb78f;
.comment-section{
   width: 700px;
   max-height: 200px;
   overflow-y: auto;
   margin-top: 1rem;
   padding-top: 2rem;
   
}
.comment-icone{
    position: absolute;
    top: 18px;
    left: 300px;
    font-size: 150%;
    cursor: pointer;
}

.comment{
    width: 600px;
    display: flex;
    margin: 0.3rem 2rem  ;
    border: 1px solid grey;
    background-color: rgba(177, 174, 174, 0.075);
    .signature{
        color:  $color-primary;
    }
     
    
    .italique{
        font-style: italic;
        font-weight: lighter;
        padding: .2rem;
        color: black;
        font-size: 90%;
    }
    .profile-pic {
        width: 50px;
        height: 50px;
        padding-right: 0.5rem;
    }
    .type-comment{
        padding-top: 2rem;

     .comment-button{
        background: $color-primary;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        height: 1.8rem;
        

    }
    .comment-input{
        width: 300px;
        height: 1.5rem;
    }
    }
    

}
</style>
