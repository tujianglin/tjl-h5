import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import { configStyleImportPlugin } from './styleImport';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';

export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY, VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  // 适配老版浏览器
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // html 配置
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // mock 数据配置
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // 组件样式按需引入配置
  vitePlugins.push(configStyleImportPlugin());

  return vitePlugins;
}
