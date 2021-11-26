<template>
    <header>
        <div>
            <img src="../assets/icon-left-font-monochrome-black.png" alt="logo groupamia">
        </div>
        <nav>
            <ul>
            
               
                <router-link to="/userinfos" class="link">

                    <li><img src="../assets/anonymous.png" alt="" class="profil-picture">{{ user.username }}</li>
                </router-link>
                
                <router-link to="/" class="link">
                    <li><i class="fas fa-power-off"></i></li>
                </router-link>
                
            </ul>
        </nav>

    </header>
    
</template>
<script>

import { mapState } from 'vuex';

export default{
    name: "TheHeader",
    computed: {
         ...mapState(['user'])
    }
    
}

</script>

<style lang="scss" scoped>
header{
   background-color: #f9d29d;
   background-image: linear-gradient(315deg, #f9d29d 0%, #ffd8cb 74%);
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   background-color: rgb(43, 41, 41);
   width: 100%;
   font-size: 2rem;
   height: 8rem;
   .link{
       text-decoration: none;
       color:#2c3e50 ;
  }

    img{
        width: 200px;
        margin-left: 2rem;
        margin-top: -3rem;
        
    }
    ul{
        justify-content: space-between;
        align-items: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin: 0 2.5rem 0 0;
        li{
            padding: 1rem;
           
            .profil-picture{
                
               width: 3rem;
               margin-top: 0;
               
               border-radius: 40px;
            }
        }
    }
}

</style>
