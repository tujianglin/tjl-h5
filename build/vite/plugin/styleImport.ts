import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  const styleImportPlugin = createStyleImportPlugin({
    libs: [
      {
        libraryName: 'vant',
        esModule: false,
        resolveStyle: (name) => `vant/es/${name}/style`,
      },
    ],
  });
  return styleImportPlugin;
}
