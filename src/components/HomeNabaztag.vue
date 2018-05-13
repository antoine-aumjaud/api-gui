<template>
  <div>
    <h2>Nabaztag</h2>
    <form>
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
  import homeNabaztagService from '../services/home-nabaztag-services'

  export default {
    name: 'home-nabaztag',
    
    data() {
      return {
        message:  null,
        error: ''
      }
    },

    methods: {
      async send() {
        //Checks
        const errorMessage = [];
        if(this.message == null || this.message.trim() == '') {
          errorMessage.push('Entrer un message');
        } 
        else {
          //Call service
          let success = await homeNabaztagService.sendMessage(this.message);
          if(success) { this.error = '' }
          else { this.error = 'L\'envoie a échouée'; }
        }
      }
    }
  }
</script>

<style scoped>
input {
  width: 100%;
}
</style>
