<template>
  <div class="small">
    <div class="mainChart">
      <line-chart :chart-data="datacollection"></line-chart>
      <button @click="fillData()">Randomize</button>
    </div>
    
  </div>
</template>

<script>
  import LineChart from '../charts/LineChart'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
      }
    },
    computed: {
        ...mapGetters(['allTransactions', 'allCards']),
        getDataSpendingByMounth(){
          let objData = {};
          let month = [];
          let spendings = [];
          let sum = 0;
          for(let i = 0; i < this.allTransactions.length - 1 ; i++){
            console.log(this.allTransactions[i].date.toDate().toLocaleString('en-US', { month: 'long' }));
            sum = sum + Number(this.allTransactions[i].sum);
            if( (this.allTransactions[i+1].date.toDate().getMonth() !== this.allTransactions[i].date.toDate().getMonth())){
              let data = this.allTransactions[i].date.toDate().toLocaleString('en-US', { month: 'long' });
              let newSum = sum;
              month.push(data);
              spendings.push(newSum)
              sum = 0;
              objData.month = month;
              objData.spendings = spendings
              }
            } console.log(objData);
          return objData
      },
        
    },
    created(){
      this.fetchCards()
      this.fetchTransactions()
    },
    mounted () {
      this.fillData()
      
    },
    methods: {
      ...mapActions(['fetchTransactions', 'fetchCards']),
      fillData () {
        this.datacollection = {
          labels: this.getDataSpendingByMounth.month,
          datasets: [
            {
              label: 'Data One',
              // backgroundColor: 'rgba(10, 175, 125, 1)',
              data: this.getDataSpendingByMounth.spendings,
              scaleOverride:true,
              scaleSteps:20,
              scaleStartValue:0,
              scaleStepWidth:1,
              scale: 10,
              backgroundColor: [
                        'rgba(10, 175, 125, 1)',
                        'rgba(10, 175, 255, 1)',
                        'rgba(255, 122, 47, 1)',
                        'rgba(161, 98, 247, 1)'
                    ],
            }, {
              label: 'Data Two',
              backgroundColor: 'rgba(10, 175, 255, 1)',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              scaleOverride:true,
                scaleSteps:20,
                scaleStartValue:0,
                scaleStepWidth:1,
                scale: 10,
            },
            
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }

</script>

<style>
  
</style>