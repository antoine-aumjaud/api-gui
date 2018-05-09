<template>
  <div id="app">

    <header>
      <h1>Services Aumjaud</h1>
      <nav>
        <ul>
          <li><router-link to="/sign-in">Identification</router-link></li>
          <li><router-link to="/monitoring">Monitoring</router-link></li>
          <li><router-link to="/home-security">Home - Security</router-link></li>
          <li><a href="">Domotique</a></li>
          <li><a href="">Taille enfants</a></li>
        </ul>
      </nav>
    </header>

    <section>
        <router-view />
    </section>

    <footer>
    </footer>  
  </div>
</template>

<script>
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    header {
      h1 {
        font-size: 2em;
        text-shadow: 2px 8px 8px #aca2a2;
        margin: 10px 0;
      }
    }

    footer {
      height: 20px;
    }

    button {
      border: none;
      color: white;
      background-color: rgb(55, 68, 126);      /* 4CAF50; **/
      padding: 15px 25px;
      margin: 5px;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }
  }
</style>
