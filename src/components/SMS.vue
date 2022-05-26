<template>
  <div>
    <h2>Envoyer un SMS</h2>
    <form>
      <fieldset>
        <label>Destinataire</label> 
        <select v-model="name">
          <option value="enola">Enola</option>
          <option value="kyllian">Kyllian</option>
          <option value="camille">Camille</option>
          <option value="antoine">Antoine</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Message</label> 
        <input type="text" v-model="message" required="required" />
      </fieldset>
      <div class="failed" v-html="error"></div>
      <button type="button" @click="send()">Envoyer</button>
    </form>
  </div>
</template>

<script>
  import secureServices from '../services/secure-services'
  import smsServices from '../services/sms-services'

  export default {
    name: 'sms',
    data() {
      return {
        name:  null,
        message:  null,
        error: ''
      }
    },

    created () {
      secureServices.secureAccess();
    },
    
    methods: {
      async send() {
        //Checks
        const errorMessage = [];
        if(this.name == null) {
          errorMessage.push('Sélectionnez un nom');
        } 
        if(this.message == null || this.message.trim() == "") {
          errorMessage.push('Entrez un message');
        } 
        if(errorMessage.length > 0) {
          this.error = 'Erreur dans le formulaire : <ul><li>' + errorMessage.join('<li>') + '</ul>';
        }
        else {
          //Call service
          const success = await smsServices.sendMessage(this.name, this.message);
          if(success) { this.error = ''; this.message = ''; }
          else { this.error = "L'envoie a échouée"; }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
select {
  width: 200px;
}
input {
  width: 100%;
}
</style>
