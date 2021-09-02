import React, { useCallback, useContext } from 'react';
import BaseLayout from './baseLayout';
import { ctx } from '@/context';
import { RouteConfigComponentProps } from 'react-router-config';

const Layouts: React.FC<RouteConfigComponentProps> = (props) => {
  const { location } = props;
  const { theme } = useContext(ctx);

  const layouts = useCallback(() => {
    // 这里可以进行基础布局的切换
    // if (location.pathname === '/login') {
    //   return <LoginLayout {...props} />;
    // }
    return <BaseLayout {...props} />;
  }, [location]);

  return <div data-theme={theme}>{layouts()}</div>;
};

export default Layouts;
