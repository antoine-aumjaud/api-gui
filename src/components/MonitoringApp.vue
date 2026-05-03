<template>
  <div class="app" :class="app.status">
    <div class="title">{{ app.name }}</div>
    <div class="infos" v-if="app.infos">{{app.infos.version}} - {{app.infos.buildDate}}</div>
    <div class="error-text">{{ app.error }}</div>
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
        type: Object,
        required: true
      },
      isConnected: {
        type: Boolean,
        required: true
      }
    }, 
    methods: {
      async doAction(app, action) {
        let dialogMsg;
        try {
          dialogMsg = await monitoringService.doAction(app, action);
        } catch(e) {
          dialogMsg = e;
        }
        this.$emit('showDialog', {message: app.name + " - " + action.name + ": " + dialogMsg, messageType: 'success'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .app {
    flex-grow:1;
    color: azure;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 8px 13px 0 #aeadad;
    background-color: #607d8b; /* default/unknown: grey-blue */

    &.ok {
      background-color: darkgreen;
    }
    &.error {
      background-color: darkred;
    }
    &.unknown {
      background-color: #607d8b;
    }

    .title {
      font-size: 1.1em;
    }
    .infos {
      font-size: 0.9em;
    }
    .error-text {
      font-size: 0.9em;
      color: #ffcccc;
    }
  }
  #app button {
    padding: 3px 10px 3px 10px;
  }
</style>
