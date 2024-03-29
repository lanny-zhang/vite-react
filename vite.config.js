import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import reactPlugin from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import eslintPlugin from 'vite-plugin-eslint'
import aliasMapJson from './alias.json'

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: './',
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'html') {
          const hostPath = env.VITE_PUBLIC_URL.endsWith('/')
            ? env.VITE_PUBLIC_URL + filename
            : `${env.VITE_PUBLIC_URL}/${filename}`

          return hostPath.startsWith('/') ? `.${hostPath}` : hostPath
        }
        return { relative: true }
      },
    },
    build: {
      outDir: path.join('build', env.VITE_PUBLIC_URL),
      assetsDir: 'static',
      rollupOptions: {
        input: {
          main: resolvePath('index.html'),
          404: resolvePath('error/404.html'),
          403: resolvePath('error/403.html'),
        },
      },
    },
    server: {
      port: 5002,
      proxy: {
        '/api': env.VITE_PROXY_API_URL,
      },
    },
    css: {
      modules: {
        generateScopedName: '[name]_[local]_[hash:base64:5]',
        hashPrefix: 'prefix',
      },
      preprocessorOptions: {
        less: {
          additionalData: "@import '@/styles/base.less';",
        },
      },
    },
    plugins: [reactPlugin(), svgrPlugin(), eslintPlugin()],
    resolve: {
      alias: aliasMapJson.reduce((acc, [alias, relativePath]) => {
        acc[alias] = resolvePath(relativePath)
        return acc
      }, {}),
    },
  }
})
