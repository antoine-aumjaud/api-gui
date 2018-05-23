<template>
  <div>
    <h2>Famille - Historique</h2>
    
    <h3>Poids</h3>
    <family-history-chart v-if="loaded" :chartData="chartDataWeight" />

    <h3>Taille</h3>
    <family-history-chart v-if="loaded" :chartData="chartDataSize" />
  </div>
</template>

<script>
  import FamilyHistoryChart from './FamilyHistoryChart.vue'

  import familyService from '../services/family-services'

  export default {
    name: 'family-history',

    data() {
      return {
        loaded: false,
        allData: [],
        chartDataSize: [],
        chartDataWeight: [],
        usersInfo: [
          {name: 'Antoine', color: '#0B8043', checked: true}, 
          {name: 'Camille', color: '#d81b60', checked: true},
          {name: 'Kyllian', color: '#3F51B5', checked: true}, 
          {name: 'Enola',   color: '#8e24aa', checked: true}, 
          {name: 'Maelynn', color: '#9e68af', checked: true}
        ],
      }
    },

    methods: {
      render() {
        this.loaded = false;
        function formatSize(s) {
          if(!s.m)  s.m  = 0;
          if(!s.cm) s.cm = 0;
          return parseFloat(s.m + '.' + s.cm);
        }
        
        function formatWeight(s) {
          if(!s.kg) s.kg = 0;
          if(!s.g)  s.g  = 0;
          return parseFloat(s.kg + '.' + s.g);
        }
        
        for(let user of this.usersInfo) {
          if(user.checked) {
            if(this.allData[user.name].size) {
              this.chartDataSize.push( {
                name: user.name,
                data: this.allData[user.name].size.map(v => { return { t: new Date(v.date), y: formatSize(v) } }),
                color: user.color
              });
            }
            if(this.allData[user.name].weight) {
              this.chartDataWeight.push( {
                name: user.name,
                data: this.allData[user.name].weight.map(v => { return { t: new Date(v.date), y: formatWeight(v) } }),
                color: user.color
              });
            }
          }
        } 
        this.loaded = true;
      }
    },
     
    async created() {
      this.allData = await familyService.getAll();
      this.render();
    },

    components: {
      FamilyHistoryChart
    }
  }
</script>

<style scoped lang="scss">
</style>
