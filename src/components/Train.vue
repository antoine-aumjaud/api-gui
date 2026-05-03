<template>
  <div>
    <h2>Trains</h2>

    <h3>Gare</h3>
    Gare la plus proche : 
    <span class="town">{{ nearestStation.town }}</span>
    
    <v-alert v-for="disruption in nextTrains.disruptions" :key="disruption" type="error" variant="tonal" class="mb-2">
      {{disruption}}
    </v-alert>

    <h3>Prochains départs</h3>
    <table v-for="direction in nextTrains.directions" :key="direction">
      <thead>
        <tr>
          <th colspan="2">{{direction}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="departure in departuresByDirection[direction] || []" :key="departure.date + '-' + departure.direction">
          <td><img :src="'images/trains/RER_' + departure.code + '.png'"></td>
          <td>{{displayDate(departure.date)}}</td>
        </tr>
      </tbody>
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

    computed: {
      departuresByDirection() {
        return this.nextTrains.nextDepatures.reduce((groups, departure) => {
          if (!groups[departure.direction]) {
            groups[departure.direction] = [];
          }
          groups[departure.direction].push(departure);
          return groups;
        }, {});
      }
    },

    async created () {
      this.nearestStation = await trainServices.getNearestStation();
      this.nextTrains = await trainServices.getNextTrains(this.nearestStation.uic);
    },

    methods: {
      displayDate(timetamp) {
        const date = new Date(timetamp);
        return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
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
