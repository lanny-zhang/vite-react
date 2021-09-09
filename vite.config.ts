import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImp from 'vite-plugin-imp';
import viteCompression from 'vite-plugin-compression';
import htmlPlugin from 'vite-plugin-html';

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: './',
    plugins: [
      reactRefresh(),
      //开启gzip压缩
      viteCompression(),
      htmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
        minify: true,
      }),
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
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
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
    server: {
      open: true,
      proxy: {
        '/proxy': {
          target: env.VITE_PROXY_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
          rewrite: (path) => path.replace(/\/proxy/, ''),
        },
      },
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode == 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
      terserOptions: {
        compress: {
          drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true',
        },
      },
    },
  });
};
