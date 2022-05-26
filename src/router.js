import Vue from 'vue'
import Router from 'vue-router'

import Monitoring     from './components/Monitoring.vue'
import SignIn         from './components/SignIn.vue'
import Family         from './components/Family.vue'
import FamilyForm     from './components/FamilyForm.vue'
import FamilyHistory  from './components/FamilyHistory.vue'
import HomeAutomation from './components/HomeAutomation.vue'
import SMS            from './components/SMS.vue'
import Train          from './components/Train.vue'

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
      path: '/home-automation',
      name: 'home-automation',
      component: HomeAutomation
    },
    {
      path: '/family',
      name: 'family',
      component: Family
    },
    {
      path: '/family-history',
      name: 'family-history',
      component: FamilyHistory
    },
    {
      path: '/family-form',
      name: 'family-form',
      component: FamilyForm
    },
    {
      path: '/sms',
      name: 'sms',
      component: SMS
    },
    {
      path: '/train',
      name: 'train',
      component: Train
    },
  ]
})
