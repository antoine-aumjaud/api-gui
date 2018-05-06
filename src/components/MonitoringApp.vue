<template>
  <div class="app" :class="app.status">
    <div class="title">{{ app.name }}</div>
    <div class="details">{{ app.error }}</div>
  </div>
</template>

<script>
  export default {
    name: 'monitoring-app',
    props: ['app']
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
    .details {
      font-size: 0.9em;
    }
  }
</style>
