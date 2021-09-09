import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import {mapGetters, mapActions} from 'vuex'

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  options: {
    responsive : true,
  },
 mounted () {
    // await this.fetchTransactions()
    this.renderChart(this.chartData, this.options)
  },
  methods:{
    ...mapActions(['fetchTransactions']),

  }
  
}