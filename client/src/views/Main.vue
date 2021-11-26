<template>
    
    <div class="main-page">
     <TheHeader userName="$user.username"></TheHeader>
     <section class="content">

         <div class="the-wall">
         <p>welcome {{ user.username }}</p>
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
         if(this.$store.state.user.userId == -1){
            this.$router.push('/');
           return
         }
        

    },
    computed: {
        ...mapState(['user'])
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
    }

}

</style>
