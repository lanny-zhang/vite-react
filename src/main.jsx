import React, { Suspense } from 'react'
// import { HashRouter as RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from '@/context'
import ErrorBoundary from './ErrorBoundary'
import ThemeProvider from './styles/themeProvider'
import router from './router'
import LoadingPage from './LoadingPage'
import './styles/global.less'

const container = document.getElementById('root')

const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    {/* react错误边界处理 */}
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        {/* 主题切换、用户信息等使用context存储 */}
        <Provider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
)
