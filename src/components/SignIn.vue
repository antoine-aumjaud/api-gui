<template>
  <div class="signin">
    <form>
      <fieldset>
        <label>Login</label> 
        <input type="text" name="login" v-model="login" />
      </fieldset>
      <fieldset>
        <label>Mot de passe</label> 
        <input type="password" name="password" v-model="password" />
      </fieldset>

      <button type="button" @click="save()">Enregistrer</button>
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
      save() {
        secureServices.auth(this.login, this.password)
          .then(() => this.success = true)
          .catch(() => this.success = false);
      }
    }
  }
</script>

<style scoped>
</style>
