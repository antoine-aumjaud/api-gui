<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile :to="{path: '/monitoring'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Monitoring</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/home-automation'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Domotique</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path: '/family'}">
          <v-list-tile-action>
            <v-icon>trending_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Famille</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Services Aumjaud</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid >
        <router-view />
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; aumjaud 2018</span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null
    })
  }
</script>

<style lang="scss">
  .container {
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

