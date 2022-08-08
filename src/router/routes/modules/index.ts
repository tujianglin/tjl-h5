import { AppRouteRecordRaw } from '/@/router/types';
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/home',
    redirect: '/home/index',
    component: () => import('/@/layouts/index.vue'),
    children: [
      {
        path: '/home/index',
        name: '首页',
        component: () => import('/@/views/home/index.vue'),
      },
    ],
  },
];
