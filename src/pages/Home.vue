<template>
  <div class="home">
    <!-- <Aside/> -->
    <Cards/>
    <div class="home__analytics">
      <div class="analytics__content">
        <Operations/>
      <Analytics/>
      </div>
      
    </div>
    
    
  </div>
</template>

<script>

import Cards from '@/components/Cards.vue'
import Analytics from '@/components/Analytics.vue'
import Operations from '@/components/Operations.vue'
import Aside from '@/components/Aside.vue'

export default {
  props: ['transactions'],
  name: 'Home',
  components: {
    Cards,
    Analytics,
    Operations,
    Aside,
  }
}
</script>
<style scoped>
  .home__analytics{
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
  }
  .analytics__content{
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
</style>
