<template>
    <div class="CardLayout">
        <h2>This is CardLayout</h2>
        <Header/>
        <div class="conteiner">
            <Aside class="CardLayout__aside"/>
            <Main  class="CardLayout__aside"/>
        </div>
        
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'
import Aside from '../components/Aside.vue'

export default {
    components: {
        Header,
        Main,
        Footer,
        Aside,
    }
}
</script>
<style scoped>
    .CardLayout{
        display: flex;
        flex-direction: column;
    }
    .conteiner {
        display: flex;
    }
</style>