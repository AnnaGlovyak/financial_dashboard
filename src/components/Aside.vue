<template>
    <div class="aside" :class="{'show-menu': menuOpen}">
        <md-list>
            <md-list-item @click="menuOpen = !menuOpen">
                <md-icon>menu</md-icon>
                <span class="md-list-item-text"></span>
            </md-list-item>
                <md-list-item  to="/about">
                <md-icon>business</md-icon>
                <span class="md-list-item-text">my cards</span>
            </md-list-item>
                <md-list-item to="/contacts">
                <md-icon>call</md-icon>
                <span class="md-list-item-text">whish list</span>
            </md-list-item>
        </md-list>
        <button @click="logout">Log out</button>
    </div>
</template>

<script>

// import Cards from '@/components/Cards.vue'

export default {
  name: 'Aside',
  components: {
    // Cards,
  }
}
</script>

<style scoped>
    /* .aside {
        display: flex;
    } */
    .aside {
        display: flex;
        justify-content: flex-start;
        max-width: 300px;
       align-items: flex-start;
       margin: 0;
    }
</style>