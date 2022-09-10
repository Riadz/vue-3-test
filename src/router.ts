import inbox from '@/pages/inbox.vue';
import archive from '@/pages/archive.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/inbox' },
  { path: '/inbox', component: inbox },
  { path: '/archive', component: archive },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
