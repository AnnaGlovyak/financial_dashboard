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
          <select name="category" id="category" class="button--popular" @change="fillDataLineChart()" v-model="chartCategory">
              <option value="Other" class="button--option" selected>Other</option>
              <option value="Food" class="button--option">Food</option>
              <option value="Pharmacy" class="button--option" >Pharmacy</option>
              <option value="Cafe" class="button--option" >Cafe</option>
          </select>
        </div>
        <div class="charts__transactions-content">
          <div class="aside__chart">
            <line-chart :chart-data="datacollectionLineChart" :options="lineChartOptions"></line-chart>
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
        barChartOptions: {
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        },
                },
        lineChartOptions: {
                    responsive: true,
                    legend: {
                        display: true,
                        position: 'bottom',
                        },
                },
        chartCategory: 'Other',
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
        return this.getTransactionsByCategory(this.chartCategory)
      } 
    },
    created(){
      this.fetchCards()
      
    },
    async mounted () {
      await this.fetchTransactions();
      await this.fillDataBarChart();
      await this.fillDataLineChart();
      this.renderChart(this.datacollectionBarChart, this.barChartOptions)
      this.renderChart(this.datacollectionLineChart, this.lineChartOptions)
    },
    methods: {
      ...mapActions(['fetchTransactions', 'fetchCards']),
      fillDataBarChart () {
        this.datacollectionBarChart = {
          labels: this.getDataSpendingByMounth.month,
          datasets: [
            {
              label: 'Total spending',
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
          ]
        }
      },
      fillDataLineChart () {
        let monthArray = this.getDataLineChart.date.map(date => date.toDate().toLocaleString('en-US', { month: 'long' }))
        this.datacollectionLineChart = {
          labels: monthArray.filter(function(item, pos) {
              return monthArray.indexOf(item) == pos;
            }),
          datasets: [
            {
              label: this.chartCategory,
              backgroundColor: 'rgba(255, 122, 47, 1)',
              data: this.getDataLineChart.sums,
              scaleOverride:true,
              scaleSteps:20,
              scaleStartValue:0,
              scaleStepWidth:1,
              scale: 10,
            }, 
          ]
        }
      },
      getTransactionsByCategory(category = 'Other'){
        if(category == ''){ category = 'Other' } 
       return this.allTransactions.reduce((total, tr) => {
          if(tr.department === category){
            total.sums.push(tr.sum);
            total.date.push(tr.date)
            } return total
          }, {
              sums: [],
              date: [],
              });
        }
    }
  }

</script>

<style>
</style>