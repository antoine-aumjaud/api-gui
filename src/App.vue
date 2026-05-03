<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="indigo" density="comfortable">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>Services Aumjaud</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer color="indigo" app class="justify-center">
      <span class="white--text">&copy; aumjaud 2018-2026</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    navigationItems: [
      { to: '/monitoring', title: 'Monitoring', icon: 'mdi-view-dashboard' },
      { to: '/train', title: 'Train', icon: 'mdi-train' },
      { to: '/home-automation', title: 'Domotique', icon: 'mdi-home' },
      { to: '/family', title: 'Famille', icon: 'mdi-chart-line' },
      { to: '/sms', title: 'SMS', icon: 'mdi-message-text' },
    ],
  }),
}
</script>

<style lang="scss">
  .container,
  .v-container {
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

