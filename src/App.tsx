import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
// history路由模式
// import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '@/context';
import routes, { RenderRoutes } from './router';
import './styles/global.less';

ReactDOM.render(
  <React.StrictMode>
    {/* react错误边界处理 */}
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          {/* 主题切换、用户信息等使用context存储 */}
          <Provider>
            <RenderRoutes routes={routes} />
          </Provider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
