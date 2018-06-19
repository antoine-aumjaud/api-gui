<template>
  <div>
    <h2>Famille</h2>
    <div>
      <router-link to="/family-form"    tag="button">Nouvelle entrée</router-link>
      <router-link to="/family-history" tag="button">Historique</router-link>
  
      <table>
        <tr>
          <th>Nom</th>
          <th>Taille</th>
          <th>Poids</th>
          <th>Pointure</th>
        </tr>
        <tr v-for="member in ['Antoine', 'Camille', 'Kyllian', 'Enola', 'Maelynn'] /*Object.keys(lastData)*/" :key="member" v-if="lastData[member]">
          <td><span class="value">{{ member }}</span></td>
          <td>
            <div v-if="lastData[member]['size']">
              <span class="value">{{lastData[member].size.m}}.{{lastData[member].size.cm}}m </span>
              <span class="date">le {{convertDate(lastData[member].size.date)}}</span>
            </div>
          </td>
          <td>
            <div v-if="lastData[member]['weight']">
              <span class="value">{{lastData[member]['weight'].kg}}.{{lastData[member]['weight'].g}}kg </span>
              <span class="date">le {{convertDate(lastData[member]['weight'].date)}}</span>
            </div>
          </td> 
          <td>
            <div v-if="lastData[member]['shoes-size']">
              <span class="value">{{lastData[member]['shoes-size'].number}} </span>
              <span class="date">le {{convertDate(lastData[member]['shoes-size'].date)}}</span>
            </div>
          </td> 
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
  import familyService from '../services/family-services'

  export default {
    name: 'family',
    data() {
      return {
        lastData: []
      }
    },
    
    async created () {
      this.lastData = await familyService.getLast();
    },

    methods: {
      convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getYear()-100].join('/');
      }
    }
  }
</script>

<style scoped lang="scss">
table {
    border-collapse: collapse;
    border: 1px solid black;
    width: 100%;
}
th {
  background: rgb(126, 55, 117);
  color: white;
}
th, td {
    border: 1px solid black;
    text-align: left;
    padding: 8px;
}
td {
  span.value {
    font-weight: bold;
    font-size: 1.2em;
  }
  span.date {
    white-space: nowrap;
  }
}

tr:nth-child(even) { 
  background-color: #f2f2f2;
}

</style>
