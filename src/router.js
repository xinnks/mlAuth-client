import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/register.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./views/dashboard.vue'),
    meta: { needsAuth: true }
  },
  {
    path: '/auth',
    name: 'AuthenticateAppAccount',
    component: () => import('./views/authenticate-app.vue'),
  },
  {
    path: '/verify',
    name: 'VerifyService',
    component: () => import('./views/verify-app.vue'),
  },
  {
    path: '/docs',
    name: 'Documentation',
    component: () => import('./views/documentation.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('./views/not-found.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
})