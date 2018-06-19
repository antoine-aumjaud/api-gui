import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 

import App from './App.vue'
import router from './router'

Vue.use(Vuetify)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')