import { AppRouteRecordRaw } from '/@/router/types';
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('/@/views/home/index.vue'),
  },
];
