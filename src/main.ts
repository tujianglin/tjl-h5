import '/@/utils/rem';
import { createApp } from 'vue';
import App from './App.vue';

import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';

async function bootstrap() {
  const app = createApp(App);

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // 配置数据存储库
  setupStore(app);

  app.mount('#app');
}

bootstrap();
