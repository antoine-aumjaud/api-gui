<template>
  <div>
    <h2>Famille - Nouvelle entrée</h2>
    <form>
      <fieldset>
        <label>Nom</label> 
        <select v-model="name">
          <option value="Maelynn">Maelynn</option>
          <option value="Enola">Enola</option>
          <option value="Kyllian">Kyllian</option>
          <option value="Camille">Camille</option>
          <option value="Antoine">Antoine</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Type</label> 
        <select v-model="type">
          <option value="weight">Poids</option>
          <option value="size">Taille</option>
          <option value="shoes-size">Pointure</option>
        </select>
      </fieldset>
      <fieldset>
        <label v-if="type != null">Valeur</label>
        <input v-if="type == 'weight'"     type="number" step="0.01" min="2"   max="100" placeholder="en kg"    v-model="value" required="required"/>
        <input v-if="type == 'size'"       type="number" step="0.01" min="0.3" max="2"   placeholder="en mètre" v-model="value" required="required"/>
        <input v-if="type == 'shoes-size'" type="number" step="1"    min="10"  max="50"                         v-model="value" required="required"/>
      </fieldset>
      <fieldset>
        <label>Date</label> 
        <input type="date" required="required"
          :value="date && date.toISOString().split('T')[0]"
          @input="date = $event.target.valueAsDate" />
      </fieldset>
      <div class="failed" v-html="error"></div>
      <button type="button" @click="save()">Sauvegarder</button>
      <router-link to="/family" tag="button">Retour</router-link>
    </form>
  </div>
</template>

<script>
  import familyService  from '../services/family-services'
  import secureServices from '../services/secure-services'

  export default {
    name: 'family-form',
    data() {
      return {
        name:  null,
        type:  null,
        value: null,
        date:  new Date(),
        error: ''
      }
    },
    
    created () {
      secureServices.secureAccess();
    },

    methods: {
      async save() {
        //Checks
        const errorMessage = [];
        if(this.name == null) {
          errorMessage.push('Sélectionnez un nom');
        } 
        if(this.type == null) {
          errorMessage.push('Sélectionnez un type');
        } 
        if(isNaN(parseFloat(this.value))) {
          errorMessage.push('Entrez un nombre valide');
        } 
        if(errorMessage.length > 0) {
          this.error = 'Erreur dans le formulaire : <ul><li>' + errorMessage.join('<li>') + '</ul>';
        }
        else {
          //Call service
          let success;
          switch(this.type) {
            case 'weight':
              success = await familyService.saveWeight(this.name, this.value, this.date);
              break;
            case 'size':
              success = await familyService.saveSize(this.name, this.value, this.date);
              break;
            case 'shoes-size':
              success = await familyService.saveShoesSize(this.name, this.value, this.date);
              break;
          }
          if(success) { this.$router.push({ path: 'family' }); /*this.error = ''*/ }
          else { this.error = 'La sauvegarde a échouée'; }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
input:invalid {
  color: red;
}
input, select {
  width: 200px;
}
</style>
