import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  plugins: [
    reactRefresh(),
    legacy({
      targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style(name) {
            return `antd/lib/${name}/style/index.css`;
          },
        },
      ],
    }),
  ],
  envDir: resolve(__dirname, 'src/config'),
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        additionalData: "@import '@/styles/base.less';",
      },
    },
  },
  // server: {
  //   cors: true, // 允许跨域
  //   proxy: {
  //     '/api': {
  //       target: 'http://www.baidu.com/',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace('/api/', '/'),
  //     },
  //   },
  // },
});
