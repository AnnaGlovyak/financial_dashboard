<template>
    <header class="header">
        <div class="header--container">
            <Slide class="header__menu-button burger-menu" :closeOnNavigation="true" noOverlay>
                <router-link to="/home" class="burger-menu__item"><md-icon>credit_card</md-icon>Dashboard</router-link>
                <router-link to="/operations" class="burger-menu__item"><md-icon>autorenew</md-icon>Operations</router-link>
                <router-link to="/analytics" class="burger-menu__item"><md-icon>assessment</md-icon>Analytics</router-link>
            </Slide>
            <div class="header__aside aside" >   
    </div>

        </div>
        <nav class="header__navigation">
            <ul class="navigation-list">
                <li class="navigation-list__item"><router-link to="/home" class="navigation-list__link">Dashboard</router-link></li>
                <li class="navigation-list__item"><router-link to="/operations" class="navigation-list__link">Operation</router-link></li>
                <li class="navigation-list__item"><router-link to="/analytics" class="navigation-list__link">Analytics</router-link></li>
            </ul>
        </nav>
        <div class="header__user">
            <img src="@/assets/Userpic.png" alt="user" class="user__img">
            <div class="user__info">
                <div class="user__name" v-if="user.email">{{ user.email }}</div>
                <button class="user__title" @click="logout()" v-if="user.email" >Log out</button>
            </div>
        </div>       
        
    </header>
    
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import {mapGetters, mapActions} from 'vuex';
import { Slide } from 'vue-burger-menu'

export default {
    data(){
        return {
            menuOpen: true
        }
    },
    components: {
        Slide,
    },
    computed: {
        ...mapGetters(['user']),
        
    },
    methods:{
        ...mapActions(['logutUser']),
        async logout(){
            const auth = getAuth();
            signOut(auth).then(() => {
            this.user = null;
            this.logutUser(this.user);
            this.$router.push('/login');
            //
            }).catch((error) => {
            });

        }
    }
}
</script>

<style scoped>

</style>
