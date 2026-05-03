
<template>
  <div class="chart-wrapper">
    <LineChart :data="chartConfig" :options="chartOptions" />
  </div>
</template>

<script>
  import {
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    TimeScale,
    Title,
    Tooltip,
  } from 'chart.js'
  import 'chartjs-adapter-date-fns'
  import { Line as LineChart } from 'vue-chartjs'

  ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, TimeScale)

  export default {
    name: 'family-history-chart',
    components: {
      LineChart,
    },
    props: {
      chartData: {
        type: Array,
        required: true,
      },
    },
    computed: {
      chartConfig() {
        return {
          datasets: this.chartData.map(ds => ({
            data: ds.data,
            label: ds.name,
            borderColor: ds.color,
            pointBorderColor: ds.color,
            pointBackgroundColor: 'white',
            borderWidth: 2,
            backgroundColor: 'transparent',
            tension: 0.25,
            spanGaps: true,
          })),
        };
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true },
          },
          scales: {
            y: {
              grid: { display: true },
            },
            x: {
              type: 'time',
              grid: { display: false },
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM yyyy',
                },
              },
            },
          },
        };
      },
    },
  }
</script>

<style scoped>
  .chart-wrapper {
    min-height: 320px;
    margin-bottom: 2rem;
  }
</style>
