import Vue from 'vue'
import Router from 'vue-router'

import Monitoring   from './components/Monitoring.vue'
import SignIn       from './components/SignIn.vue'
import HomeSecurity from './components/HomeSecurity.vue'
import Family       from './components/Family.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/monitoring',
      name: 'monitoring',
      component: Monitoring,
      alias: '/'
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/home-security',
      name: 'home-security',
      component: HomeSecurity
    },
    {
      path: '/family',
      name: 'family',
      component: Family
    },
    
  ]
})
