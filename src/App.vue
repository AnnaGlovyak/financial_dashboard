<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <component :is="layout"/>
    <!-- <MainLayout/> -->
  </div>
</template>
<script>
import MainLayout from './layouts/MainLayout.vue'
import CardLayout from './layouts/CardLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'


export default {
  
    components: {
      MainLayout,
      CardLayout,
      AuthLayout,
    },
    computed: {
      layout() {
        // console.log('this path', this.$route.path)
          return  (this.$route.meta.layout) + '-layout'
         
      }
    }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
