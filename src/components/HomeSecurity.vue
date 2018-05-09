<template>
  <div>
    <h2>Securité</h2>
    <div v-if="!isActivated">
      La sécurité est désactivée. <br/>
      <button type="button" @click="activate()">ACTIVER</button>
    </div>
    <div v-else>
      La sécurité est ACTIVE. <br/>
      <button type="button" @click="deactivate()">DESACTIVER</button>
    </div>
  </div>
</template>

<script>
  import homeSecurityService from '../services/home-security-services'
  import secureService from '../services/secure-services'

  export default {
    name: 'home-security',
    data () {
      return {
        isActivated: false
      }
    },
    async created () {
      this.isActivated = await homeSecurityService.isActivated();
    },
        
    methods: {
      async activate () {
        this.isActivated = await homeSecurityService.activate();
      },
      async deactivate () {
        let id = secureService.getTokenLogin();
        this.isActivated = await homeSecurityService.deactivate(id);
      }
    }
  }
</script>

<style scoped>
</style>
