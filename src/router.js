import { createRouter, createWebHistory } from 'vue-router'
import secureServices from './services/secure-services'

const routes = [
  {
    path: '/',
    redirect: '/monitoring',
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: () => import('./components/Monitoring.vue'),
  },
  {
    path: '/sign-in',
    name: 'signin',
    meta: { public: true },
    component: () => import('./components/SignIn.vue'),
  },
  {
    path: '/home-automation',
    name: 'home-automation',
    component: () => import('./components/HomeAutomation.vue'),
  },
  {
    path: '/family',
    name: 'family',
    component: () => import('./components/Family.vue'),
  },
  {
    path: '/family-history',
    name: 'family-history',
    component: () => import('./components/FamilyHistory.vue'),
  },
  {
    path: '/family-form',
    name: 'family-form',
    component: () => import('./components/FamilyForm.vue'),
  },
  {
    path: '/sms',
    name: 'sms',
    component: () => import('./components/SMS.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.public) {
    return true
  }

  if (secureServices.isTokenValid()) {
    return true
  }

  return {
    name: 'signin',
    query: { redirect: to.fullPath },
  }
})

export default router
