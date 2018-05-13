<template>
  <div>
    <h2>Connexion</h2>
    <form>
      <fieldset>
        <label>Login</label> 
        <input type="text" name="login" placeholder="Votre nom.." v-model="login" required="required"/>
      </fieldset>
      <fieldset>
        <label>Mot de passe</label> 
        <input type="password" name="password" placeholder="Votre mot de passe..." v-model="password" required="required" @keyup.enter="connect()" />
      </fieldset>
      <div class="failed" v-html="error"></div>
      <button type="button" @click="connect()">Se connecter</button>
    </form>
  </div>
</template>

<script>
  import secureServices from '../services/secure-services'

  export default {
    name: 'signin',

    data() {
      return {
        login:    null,
        password: null,
        error:    ''
      }
    },
    
    methods: {
      async connect() {
        //Checks
        const errorMessage = [];
        if(this.login == '') {
          errorMessage.push('Entrez un nom');
        } 
        if(this.password == '') {
          errorMessage.push('Entrez un mot de passe');
        } 
        if(errorMessage.length > 0) {
          this.error = 'Erreur dans le formulaire : <ul><li>' + errorMessage.join('<li>') + '</ul>';
        }
        else {
          //Call service
          const success = await secureServices.auth(this.login, this.password);
          
          if(success) { this.$router.go(-1); /*this.$router.push('/')*/ /*this.error = ''*/ }
          else { this.error = 'Echec d\'authentification'; }
        }
      }
    }
  }
</script>

<style scoped>
</style>
