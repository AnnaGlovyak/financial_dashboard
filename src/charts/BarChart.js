import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import {mapGetters, mapActions} from 'vuex'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  options: {
    responsive : true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      }
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
  },
  computed: {
    ...mapGetters(['loading']),
  },
  async mounted () {
    // await this.fetchTransactions()
    await this.renderChart(this.chartData, this.options)
  },
  methods:{
    ...mapActions(['fetchTransactions']),

  }
  
}