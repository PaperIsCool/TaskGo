import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/app',
    name: 'Tasks',
    component: () => import('@/pages/Tasks.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
