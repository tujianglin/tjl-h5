import type { ConfigEnv, UserConfig, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import postCssPxToRem from 'postcss-pxtorem';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  isBuild && vitePlugins.push(legacy());

  return {
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [postCssPxToRem({ rootValue: 16, propList: ['*'] })],
      },
    },
  };
};
