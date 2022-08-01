import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

import { configStyleImportPlugin } from './styleImport';

export function createVitePlugin(viteEnv: ViteEnv, isBuild?: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configStyleImportPlugin());

  return vitePlugins;
}
