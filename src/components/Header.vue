<template>
    <header class="header">
        <div class="header--container">
            <i class="fas fa-bars"></i>
            <input class="header__search" type="search" placeholder="search">
        </div>
        <nav class="header__navigation">
            <ul class="navigation-list">
                <li class="navigation-list__item"><router-link to="/" class="navigation-list__link">Dashboard</router-link></li>
                <li class="navigation-list__item"><router-link to="/operations" class="navigation-list__link">Operation</router-link></li>
                <li class="navigation-list__item"><router-link to="/analytics" class="navigation-list__link">Analytics</router-link></li>
            </ul>
        </nav>
        <div class="header__user">
            <img src="@/assets/settings.png" alt="user" class="user__settings">
            <img src="@/assets/Userpic.png" alt="user" class="user__img">
            <div class="user__info">
                <div class="user__name">Anna Glovyak</div>
                <div class="user__title">developer</div>
            </div>
        </div>       
        
    </header>
    
</template>
<script>


export default {
    
}
</script>

<style scoped>

    .header {
        max-width: 1600px;
        width: 100%;
        height: 68px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        font-size: 16px;
        font-weight: 600;
        padding: 0 20px;
        
    }
    .header__search {
        width: 220px;
        height: 36px;
        background: #F2F3F7;
        border: none;
        border-radius: 5px;  
    }
    .header__user {
        max-width: 350px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .user__img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
    .user__name {
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #2E2E3A;
    }
    .user__title{
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #9A9AAF;
    }
    .user__settings{
        width: 19px;
        height: 19px;
    }

    .navigation-list {
        display: flex;
        list-style: none;
    }
    .navigation-list__item {
        padding: 0 20px;
        
    }
    .md-theme-default a:not(.md-button){
        color: black;
    }
    .header--container {
        align-content: center;
        max-width: 350px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .navigation-list__link {
        text-decoration: none;
        color: black;
    }
</style>
