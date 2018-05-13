<template>
  <div id="app">

    <header>
      <h1>Services Aumjaud</h1>
      <nav-menu />
    </header>

    <section>
        <router-view />
    </section>

    <footer>
    </footer>  
  </div>
</template>

<script>
  import NavMenu from './components/NavMenu.vue'

  export default {
    name: 'app',
    components: {
      NavMenu
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    header {
      h1 {
        font-size: 2em;
        text-shadow: 2px 5px 5px #aca2a2;
        margin: 10px 0;
      }
    }

    footer {
      height: 20px;
    }

    button {
      border: none;
      border-radius: 10px;
      color: white;
      background-color: rgb(55, 68, 126);
      padding: 15px 25px;
      margin: 5px;
      text-align: center;
      font-size: 1.1em;
      cursor: pointer;
    
    }  
    button:hover {
      background-color: rgb(126, 55, 117);  
    }
    
    fieldset {
      border: none;

      select, input {
        font-size: 1.1em;
        margin: 8px 0;
        display: block;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px #ddd;
        border-radius: 4px;
        box-sizing: border-box;
        padding-left:   20px;
        padding-right:  20px;
        padding-top:    12px;
        padding-bottom: 12px;
      }
    }

    div.failed {
      color: red;
    }
  }
</style>
