<template>
    <div class="main-layout">
        <!-- <h2>This is MainLayout</h2> -->
        <Header/>
        <Main/>
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {
        Header,
        Main,
        Footer,
    }
}
</script>
<style scoped>
.main-layout{
    height: 100%;
    display: flex;
    flex-direction: column;
    /* flex-grow: 1; */
}
/* .main{
    height: 100%;
} */

</style>
