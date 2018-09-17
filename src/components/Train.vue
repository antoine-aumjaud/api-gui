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
    <table v-for="direction in nextTrains.directions" v-bind:key="direction">
      <tr>
        <th colspan="2">{{direction}}</th>
      </tr>
      <tr v-if="departure.direction == direction" v-for="departure in nextTrains.nextDepatures" v-bind:key="departure.date">
        <td><img :src="'images/trains/RER_' + departure.code + '.png'"></td>
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
        return date.getHours() + ":" + date.getMinutes();
      }
    }
  }
</script>

<style scoped lang="scss">
table {
  margin-bottom: 1em;
  margin-left: 1em;
  width: 15em;
  border-collapse: collapse;
  border: 1px solid black;
  float: left;
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
