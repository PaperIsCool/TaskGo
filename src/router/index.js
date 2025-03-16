import { createRouter, createWebHistory } from 'vue-router';
import Tasks from '@/pages/Tasks.vue';
import Index from '@/pages/index.vue';
import NotFound from '@/pages/404.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/app',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
