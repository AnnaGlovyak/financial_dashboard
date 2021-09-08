<template>
<div>
  
  <div class="home">
    <!-- <Aside/> -->
    <Cards 
    @do-fats-payment="doFatsPayment"/>
    <div class="home__analytics">
      <div class="home__operations">
      <Operations
      @new-transaction="newTransaction"
      />
      
      </div>
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
  data(){
    return{
      
    }
  },
  components: {
    Cards,
    Operations,
  },
  computed: {
    ...mapGetters(['allCards']),
    isSpinner(){
      if(this.allCards.length == 0){
        return true;
      } else
      return false
    }
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

  .md-progress-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
    }

    .home__operations .transactions__list{
        max-height: 250px !important
    }
  /* .operations{
    background: transparent;
  } */
</style>
