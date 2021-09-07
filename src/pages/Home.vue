<template>
  <div class="home">
    <md-progress-spinner :md-diameter="60" :md-stroke="5" md-mode="indeterminate"  v-if="!allCards"></md-progress-spinner>
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
import {mapGetters} from 'vuex'

export default {
  props: ['transactions'],
  name: 'Home',
  components: {
    Cards,
    Operations,
  },
  computed: mapGetters(['allCards']),
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

.md-progress-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
  }

  /* .operations{
    background: transparent;
  } */
</style>
