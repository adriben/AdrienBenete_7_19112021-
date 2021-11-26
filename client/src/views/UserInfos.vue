<template>

    <div class="user-infos">
        <the-header></the-header>
        <form action="">
   <label for="avatar">Choose a profile picture:</label>

<input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg">
       <input type="submit" @click="changeImage">
</form>
    </div>


    
</template>

<script>
import  TheHeader  from '../components/TheHeader.vue';
import { mapState } from 'vuex';

export default {
    components: {
      "TheHeader": TheHeader
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        changeImage: function(event){
       event.preventDefault()
       this.$store.dispatch('changeInfos',{
        userId: this.$store.state.user.userId,
        image: document.querySelector('input[type=file]').files[0]
       
        
      })
      
     }

    }
}
</script>
<style lang="scss" scoped>
.user-infos{
    width: 100%;

}

</style>
