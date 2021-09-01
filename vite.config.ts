import { defineConfig } from 'vite';
import { resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

export default defineConfig({
  plugins: [
    reactRefresh(),
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
  alias: {
    '@': resolve(__dirname, 'src'),
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        //全局样式引入
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
