import React, { Suspense } from 'react'
// import { HashRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from '@/context'
import ErrorBoundary from './ErrorBoundary'
import Routers from './router'
import './styles/global.less'

const container = document.getElementById('root')

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    {/* react错误边界处理 */}
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          {/* 主题切换、用户信息等使用context存储 */}
          <Provider>
            <Routers />
          </Provider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
)
