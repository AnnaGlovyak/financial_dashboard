<template>
  <div class="charts">
    <div class="charts__content">
      <div class="charts__main">
        <div class="charts__header">
          <h1 class="charts__title">Total spending trend</h1>
        </div>
        <div class="charts__transactions-content">
          <div class="charts__mainChart">
            <bar-chart :chart-data="datacollectionBarChart" :options="barChartOptions"></bar-chart>
          </div>
        </div>
      </div>
      <div class="charts__transactions">
        <div class="charts__header">
          <h1 class="charts__title">Spending by category</h1>
          <select name="popular" id="popular" class="button--popular">
              <option value="popular" class="button--option">Other</option>
              <option value="popular" class="button--option">Food</option>
              <option value="popular" class="button--option">Pharmacy</option>
              
          </select>
        </div>
        <div class="charts__transactions-content">
          <div class="aside__chart">
            <line-chart :chart-data="datacollectionLineChart"></line-chart>
            <!-- <button @click="getTransactionsByCategory('Food')">category</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BarChart from '../charts/BarChart'
  import LineChart from '../charts/LineChart'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {
      BarChart,
      LineChart
    },
    data () {
      return {
        datacollectionBarChart: null,
        datacollectionLineChart: null,
        barChartOptions: null,
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
      getDataLineChart(){
        console.log(this.getTransactionsByCategory())
        return this.getTransactionsByCategory()
      } 
    },
    created(){
      this.fetchCards()
      
    },
    async mounted () {
      await this.fetchTransactions();
      await this.fillDataBarChart();
      await this.fillDataLineChart();
      
    },
    methods: {
      ...mapActions(['fetchTransactions', 'fetchCards']),
      fillDataBarChart () {
        this.datacollectionBarChart = {
          labels: this.getDataSpendingByMounth.month,
          datasets: [
            {
              label: 'Total spending',
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
                        'rgba(161, 98, 247, 1)',
                        '#FEB907',
                        '#F84439',
                        '#D9FFDF',
                        '#3346E7',
                        '#D9AAFF',

                    ],
            }, 
            // {
            //   label: 'Data Two',
            //   backgroundColor: 'rgba(10, 175, 255, 1)',
            //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
            //   scaleOverride:true,
            //     scaleSteps:20,
            //     scaleStartValue:0,
            //     scaleStepWidth:1,
            //     scale: 10,
            // },
            
          ]
        },
        this.barChartOptions = {
          responsive: true,
          defaults:{
            plugins: {
              legend: {
              display: false,
              position: 'bottom',
              }
            },
          },
          
          layout: {
              padding: {
                  left: 50
              }
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true
            }
          },
          scales: {
            y: { // defining min and max so hiding the dataset does not change scale range
              min: 0,
              max: 100
            }
          }
        
        }
      },
      fillDataLineChart () {
        this.datacollectionLineChart = {
          labels: this.getDataSpendingByMounth.month,
          datasets: [
            {
              label: 'Category name',
              backgroundColor: 'rgba(255, 122, 47, 1)',
              data: this.getDataLineChart,
              scaleOverride:true,
              scaleSteps:20,
              scaleStartValue:0,
              scaleStepWidth:1,
              scale: 10,
              // backgroundColor: [
              //           'rgba(10, 175, 125, 1)',
              //           'rgba(10, 175, 255, 1)',
              //           'rgba(255, 122, 47, 1)',
              //           'rgba(161, 98, 247, 1)',
              //           '#FEB907',
              //           '#F84439',
              //           '#D9FFDF',
              //           '#3346E7',
              //           '#D9AAFF',

              //       ],
            }, 
            // {
            //   label: 'Data Two',
            //   backgroundColor: 'rgba(10, 175, 255, 1)',
            //   data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
            //   scaleOverride:true,
            //     scaleSteps:20,
            //     scaleStartValue:0,
            //     scaleStepWidth:1,
            //     scale: 10,
            // },
            // options: {
            //         responsive: true,
            //         plugins: {
            //             legend: {
            //             position: 'bottom',
            //             }
            //         },
            //         layout: {
            //             padding: {
            //                 left: 50
            //             }
            //         }
                    
            //     }
          ]
        }
      },
      getTransactionsByCategory(category = 'Other'){
       return this.allTransactions.reduce((totalSums, tr) => {
          if(tr.department === category){
            // console.log(tr.sum)
            totalSums.push(tr.sum)
            }return totalSums
          }, []);
        }
    }
  }

</script>

<style>
/* .charts{
  height: 100%;
}
  .mainChart {
    height: 100%;
  } */
</style>