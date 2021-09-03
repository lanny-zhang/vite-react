import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from '@/context';
import { Suspense } from 'react';
import routes, { renderRoutes } from './router';
import './styles/global.less';

ReactDOM.render(
  <React.StrictMode>
    {/* react错误边界处理 */}
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          {/* 主题切换、用户信息等使用context存储 */}
          <Provider>{renderRoutes({ routes })}</Provider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
