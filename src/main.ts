import '/@/utils/rem';
import { createApp } from 'vue';
import dd from 'dingtalk-jsapi';
import wx from 'weixin-js-sdk';

import App from './App.vue';

import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';

async function bootstrap() {
  const app = createApp(App);

  // 当前环境是钉钉 则全局挂载 钉钉的jsapi
  if (dd.env.platform !== 'notInDingTalk') {
    app.config.globalProperties.$dd = dd;
  }

  // 当前环境是企微 则全局挂载 企微的 wxsdk
  if (~navigator.userAgent.indexOf('MicroMessenger') && ~navigator.userAgent.indexOf('wxwork')) {
    app.config.globalProperties.$wx = wx;
  }

  // 配置路由
  setupRouter(app);

  // 路由守卫
  setupRouterGuard(router);

  // 配置数据存储库
  setupStore(app);

  app.mount('#app');
}

bootstrap();
