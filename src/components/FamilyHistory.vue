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
        allData: []
      }
    },
    
    async created () {
      this.allData = await familyService.getAll();
    },

    methods: {
    }
  }
</script>

<style scoped lang="scss">
</style>
