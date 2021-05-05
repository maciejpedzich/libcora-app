import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import { Storage } from '@capacitor/core';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/auth/log-in',
    name: 'LogIn',
    component: () => import('../views/auth/LogIn.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  const accessToken = await Storage.get({ key: 'accessToken' });
  const authRouteNames = ['Register', 'LogIn'];

  if (!authRouteNames.includes(to.name as string) && !accessToken.value) {
    next({ name: 'LogIn' });
  } else {
    next();
  }
});

export default router;
