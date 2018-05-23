<template>
  <div>
    <h2>Monitoring</h2>
    <div class="monitoring">
      <monitoring-app :app="app" :isConnected="isConnected" v-for="app in apps" :key="app.uid" />
    </div>
  </div>
</template>

<script>
  import MonitoringApp from './MonitoringApp.vue'
  
  import monitoringService from '../services/monitoring-services'
  import secureService from '../services/secure-services'

  export default {
    name: 'monitoring',
    data() {
      return {
        apps: [],
        isConnected: false
      }
    },
    created() {
      this.apps = monitoringService.getApps();
      this.isConnected = secureService.isTokenValid();
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
