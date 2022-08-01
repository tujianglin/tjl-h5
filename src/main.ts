import '/@/utils/rem';
import { createApp } from 'vue';
import App from './App.vue';

import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';

async function bootstrap() {
  const app = createApp(App);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();
