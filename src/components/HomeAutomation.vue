<template>
  <div>
    <h2>Domotique</h2>
    <div class="bloc"><home-security /></div>
    <div class="bloc"><home-nabaztag /></div>
  </div>
</template>

<script>
  import secureServices from '../services/secure-services'
  import HomeSecurity from './HomeSecurity.vue'
  import HomeNabaztag from './HomeNabaztag.vue'

  export default {
    name: 'home-automation',
        
    created () {
      secureServices.secureAccess();
    },
    
    components: {
      HomeSecurity, HomeNabaztag
    }
  }
</script>

<style scoped>
div.bloc {
  border : 1px;
  border-style: solid;
  border-color: darkslategray;
  padding-left:   10px;
  padding-right:  10px;
  padding-bottom: 10px;
  border-radius:  10px;
  margin: 10px;
}
</style>
