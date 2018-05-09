<template>
  <div>
    <h2>Connexion</h2>
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
      async save() {
        this.success = await secureServices.auth(this.login, this.password);
        if(this.success) { this.$router.go(-1); /*this.$router.push('/')*/ }
      }
    }
  }
</script>

<style scoped lang="scss">
  .failed {
    color: red;
  }
</style>
