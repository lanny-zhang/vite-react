import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
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
    '@': '/src',
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
});
