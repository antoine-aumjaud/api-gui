<template>
  <div>
    <h2>Monitoring</h2>
    <v-alert transition="fade-transition" :value="dialogIsVisible" :type="dialogType">{{ dialogMsg }}</v-alert>

    <div class="monitoring">
      <monitoring-app v-on:showDialog='showDialog' :app="app" :isConnected="isConnected" v-for="app in apps" :key="app.uid" />
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
        dialogIsVisible: false,
        dialogMsg: '',
        dialogType: 'success',
        apps: [],
        isConnected: false
      }
    },
    created() {
      this.apps = monitoringService.getApps();
      this.isConnected = secureService.isTokenValid();
    },
    methods: {
      showDialog(event) {
        this.dialogIsVisible = true;
        this.dialogMsg = event.message;
        this.dialogType = event.messageType;
        setTimeout(function() { this.dialogIsVisible = false; }.bind(this), 2000);
      }
    },
    components: {
      MonitoringApp
    },
  }
</script>

<style scoped>
  .monitoring {
    display: flex;
    flex-flow: row wrap; 
    justify-content: flex-around;
  }
</style>
