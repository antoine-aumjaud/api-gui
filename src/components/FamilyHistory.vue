<template>
  <div>
    <h2>Famille - Historique</h2>
  </div>
</template>

<script>
  import familyService from '../services/family-services'

  export default {
    name: 'family-history',
    data() {
      return {
        lastData: []
      }
    },
    
    async created () {
      this.lastData = await familyService.getLast();
    },

    methods: {
    }
  }
</script>

<style scoped lang="scss">
</style>
