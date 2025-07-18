

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('./views/Blog.vue'),
  },
  {
    path: '/blog/:id',
    name: 'blog-post',
    component: () => import('./views/BlogPost.vue'),
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
