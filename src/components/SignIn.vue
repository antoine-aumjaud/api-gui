<template>
  <div>
    <h2>Connexion</h2>
    <form>
      <fieldset>
        <label>Login</label> 
        <input type="text" name="login" placeholder="Votre nom.." v-model="login"/>
      </fieldset>
      <fieldset>
        <label>Mot de passe</label> 
        <input type="password" name="password" placeholder="Votre mot de passe..." v-model="password" />
      </fieldset>
      <button type="button" @click="connect()">Se connecter</button>
    </form>
    <span v-if="!success" class="failed">Echec d'authentification</span>
  </div>
</template>

<script>
  import secureServices from '../services/secure-services'

  export default {
    name: 'signin',

    data() {
      return {
        login:    this.login,
        password: this.password,
        success:  true
      }
    },
    
    methods: {
      async connect() {
        this.success = await secureServices.auth(this.login, this.password);
        if(this.success) { this.$router.go(-1); /*this.$router.push('/')*/ }
      }
    }
  }
</script>

<style scoped>
  .failed {
    color: red;
  }
</style>
