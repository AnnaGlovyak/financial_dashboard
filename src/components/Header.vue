<template>
    <header class="header">
        <div class="header--container">
            
            <span class="header__menu-button"  @click="menuOpen = !menuOpen">
                <md-icon>menu</md-icon>
            </span>
            <div class="header__aside aside" >   
          <!--:class="{'show-menu': menuOpen}" -->
                <ul class="aside__menu" :class="{'show-menu': menuOpen}">
                    <li class="menu__item" to="/">
                        <span class="menu__title">My cards</span>
                        <div class="menu__content">
                            <div class="menu__card">
                                <md-icon>business</md-icon>card 1</div>
                            <div class="menu__card">card 1</div>
                            <div class="menu__card">card 1</div>
                        </div>
                    </li>
                    <li class="menu__item" to="/operations">
                        <span class="menu__title">Wish List</span>
                        <div class="menu__content">
                            <div class="menu__card">
                                <md-icon>business</md-icon>card 1</div>
                            <div class="menu__card">card 1</div>
                            <div class="menu__card">card 1</div>
                        </div>
                    </li>
                </ul>
        <!-- <button @click="logout">Log out</button> -->
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
                <!-- <div class="user__name">name</div> -->
                <div class="user__name">{{ user.email }}</div>
                <button class="user__title" @click="logout()">Log out</button>
            </div>
        </div>       
        
    </header>
    
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import {mapGetters} from 'vuex'

export default {
    data(){
        return {
            menuOpen: true
        }
    },
    computed: {
        ...mapGetters(['user']),
        
    },
    methods:{
        logout(){
            const auth = getAuth();
            signOut(auth).then(() => {
            this.$router.push('/login')
            //
            }).catch((error) => {
            // An error happened.
            });

        }
    }
}
</script>

<style scoped>

</style>
