<template>
  <div>
    <h2>Monitoring</h2>
    <div class="monitoring">
      <monitoring-app :app="app" v-for="app in apps" :key="app.uid"></monitoring-app>
    </div>
  </div>
</template>

<script>
  import MonitoringApp from './MonitoringApp.vue'
  import monitoringService from '../services/monitoring-services'

  export default {
    name: 'monitoring',
    data () {
      return {
        apps: []
      }
    },
    async created () {
      this.apps = await monitoringService.getApps();
    },
    components: {
      MonitoringApp
    }
  }
</script>

<style scoped>
  .monitoring {
    display: flex;
    flex-flow: row wrap; 
    justify-content: flex-around;
  }
</style>
