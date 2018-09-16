<template>
  <div>
    <h2>Trains</h2>

    <h3>Gare</h3>
    Gare la plus proche : 
    <span class="town">{{ nearestStation.town }}</span>
    
    <v-alert :value="true" type="error" v-for="disruption in nextTrains.disruptions" v-bind:key="disruption">
      {{disruption}}
    </v-alert>

    <h3>Prochains départs</h3>
    <form>
    <div v-for="(direction, i) in nextTrains.directions" v-bind:key="direction">
      <input type="checkbox" :id="'dir_'+i" :value="direction" checked>
      <label :for="'dir_'+i">{{direction}}</label>
    </div> 
    </form>

    <table>
      <tr>
        <th>Ligne</th>
        <th>Direction</th>
        <th>Horaire</th>
      </tr>
      <tr v-for="departure in nextTrains.nextDepatures" v-bind:key="departure.date">
        <td><img :src="'images/trains/RER_' + departure.code + '.png'"></td>
        <td class="direction">{{departure.direction}}</td>
        <td>{{displayDate(departure.date)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import trainServices from '../services/train-services'

  export default {
    name: 'train',
    data() {
      return {
        nearestStation: { town: "" },
        nextTrains: { disruptions:[], directions:[], nextDepatures:[] }
      }
    },

    async created () {
      this.nearestStation = await trainServices.getNearestStation();
      this.nextTrains = await trainServices.getNextTrains(this.nearestStation.uic);
    },

    methods: {
      displayDate(timetamp) {
        const date = new Date(timetamp);
        return date.getUTCHours() + ":" + date.getUTCMinutes();
      }
    }
  }
</script>

<style scoped lang="scss">
table {
    margin-top: 1em;
    border-collapse: collapse;
    border: 1px solid black;
}
th {
  background: rgb(126, 55, 117);
  color: white;
}
th, td {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
}
td.direction {
  text-align: left;
}
h3 {
  padding-top: 1.5em;
  padding-bottom: .8em;
}
img {
  width: 1.5em;
}
span.town {
    font-weight: bold;
}
span.issue {
    font-weight: bold;
}

</style>
