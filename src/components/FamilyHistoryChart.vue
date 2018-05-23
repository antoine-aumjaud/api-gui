
<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'family-history-chart',
    extends: Line,

    props: {
      chartData: {
        type: Array,
        required: true
      }
    },
    computed: {
      datasets: function () {
        return this.chartData.map(ds => {
          return {
              data: ds.data,
              label: ds.name,
              borderColor: ds.color,
              pointBorderColor: ds.color,
              pointBackgroundColor: 'white',
              borderWidth: 2,
              backgroundColor: 'transparent',
            }
        });
      }
    },

    mounted() {
      this.renderChart( { datasets: this.datasets }, {
        scales: {
          yAxes: [{
            gridLines: { display: true }
          }],
          xAxes: [{
            type: 'time',
            gridLines: { display: false },
            time: { 
              unit: 'month',
              displayFormats: {
                quarter: 'MMM YYYY'
              } 
            }
          }]
        },
        legend: { display: true },
        responsive: true,
        maintainAspectRatio: false
      })
    },
  }
</script>

<style scoped>
</style>
