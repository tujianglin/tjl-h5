import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './routes';

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: routes as RouteRecordRaw[],
  strict: true,
});

/** 重置路由 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    console.log(name);
  });
}

/** 配置路由 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}
