<template>
    <div class="main">
        <md-progress-spinner :md-diameter="60" :md-stroke="5" md-mode="indeterminate"  v-if="isSpinner"></md-progress-spinner>
        <router-view/>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['allTransactions']),
    isSpinner(){
      if(this.allTransactions.length == 0){
        return true;
      } else
      return false
    }
  },
}
</script>

<style scoped>
    .main {
        flex-grow: 1;
        max-width: 1600px;
        width: 100%;
        margin: 0 auto;
    }
    .md-progress-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
  }
    
</style>