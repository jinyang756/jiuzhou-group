

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import RiDouTouZi from './views/RiDouTouZi.vue';
import JuCaiZhongFa from './views/JuCaiZhongFa.vue';
import XunFeiTong from './views/XunFeiTong.vue';
import Portal from './views/Portal.vue';
import Sandbox from './views/Sandbox.vue';
import Media from './views/Media.vue';
import Xianzhi from './views/Xianzhi.vue';
import Tools from './views/Tools.vue';

import ShumiYuan from './views/ShumiYuan.vue';
import XianZhiHuiJu from './views/XianZhiHuiJu.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/portal',
    component: Portal,
  },
  {
    path: '/sandbox',
    component: Sandbox,
  },
  {
    path: '/media',
    component: Media,
  },
  {
    path: '/tools',
    component: Tools,
  },
  {
    path: '/xianzhi',
    component: Xianzhi,
  },
  {
    path: '/ridou',
    component: RiDouTouZi,
  },
  {
    path: '/jucaizhongfa',
    component: JuCaiZhongFa,
  },
  {
    path: '/xunfeitong',
    component: XunFeiTong,
  },
  { path: '/shumiyuan', component: ShumiYuan, },
  { path: '/xianzhihuiju', component: XianZhiHuiJu, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
