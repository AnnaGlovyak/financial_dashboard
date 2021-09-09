import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ['options'],
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//         legend: {
//         position: 'bottom',
//         }
//     },
//     layout: {
//         padding: {
//             left: 50
//         }
//     }  
// },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}