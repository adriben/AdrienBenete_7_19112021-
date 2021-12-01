<template>
    <div>
     <i @click="deletePost" class="fas fa-trash-alt"></i>
       

    </div>
    
</template>
<script>



export default{
    name: "DeleteButton",
    props: {
        postId: Number
    },
    methods: {
        deletePost: async function (){
            let ok = confirm('Are you sure you want to delete this post?')
            
            if(ok){return fetch (`http://localhost:5000/api/posts/${this.postId}`,
             {
             method: "DELETE"
             }) 
            .then((responsehttp) => {
      return responsehttp.json();
    })
    .then(() => {
        console.log('Post deleted');
        this.getPosts()
        
    })
    .catch((err) => {
      console.log(err)
    });}
        },
        getPosts(){
            this.$parent.getPosts()
        }
    }
    
}

</script>

<style lang="scss" scoped>

i{
    cursor: pointer;
    color: red;
    float: right;
    padding: 1rem;
}

</style>
