<template>
  <div class="home">
    <!-- <Aside/> -->
    <Cards 
    @do-fats-payment="doFatsPayment"/>
    <div class="home__analytics">
      <div class="analytics__content">
      <Operations
      @new-transaction="newTransaction"
      />
      
      </div>
      
    </div>
    
    
  </div>
</template>

<script>

import Cards from '@/components/Cards.vue'
import Operations from '@/components/Operations.vue'

export default {
  props: ['transactions'],
  name: 'Home',
  components: {
    Cards,
    Operations,
  },
  methods: {
    doFatsPayment(payload){
            console.log('doFatsPayment', payload);
    },
    newTransaction(){
      console.log('newPayment from Home');
      console.log(this.transactions);
    }
  }
}
</script>
<style scoped>

  /* .home__analytics{
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
    background: #F2F3F7;
  }
  .analytics__content{
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  } */
</style>
