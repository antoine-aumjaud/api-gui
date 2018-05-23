<template>
  <div class="app" :class="app.status">
    <div class="title">{{ app.name }}</div>
    <div class="infos" v-if="app.infos">{{app.infos.version}} - {{app.infos.buildDate}}</div>
    <div class="error">{{ app.error }}</div>
    <div v-if="isConnected" class="actions">
      <button type="button" v-for="action in app.actions" :key="action.method" @click="doAction(app, action)">{{action.name}}</button>
    </div>
    
  </div>
</template>

<script>
  import monitoringService from '../services/monitoring-services'

  export default {
    name: 'monitoring-app',
    props:  {
      app: {
        type: String,
        required: true
      },
      isConnected: {
        type: Boolean,
        required: true
      }
    },       
    methods: {
      doAction(app, action) {
        monitoringService.doAction(app, action);
      }
    }
  }
</script>

<style scoped lang="scss">
  .error {
    background-color: darkred;
  }
  .ok {
    background-color: darkgreen;
  }
  .unknown {
    background-color: rgb(168, 198, 255);
  }

  .app {
    flex-grow:1;
    color: azure;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 8px 13px 0 #aeadad;

    .title {
      font-size: 1.1em;
    }
    .infos {
      font-size: 0.9em;
    }
    .error {
      font-size: 0.9em;
      color: red;
    }

  }
  #app button {
    padding: 3px 10px 3px 10px;
  }
</style>
