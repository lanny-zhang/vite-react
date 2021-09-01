import React, { useCallback, useState } from 'react';
import BaseLayout from './baseLayout';
import { Button } from 'antd';
import { RouteConfigComponentProps } from 'react-router-config';

const Layouts: React.FC<RouteConfigComponentProps> = (props) => {
  const { location } = props;
  const [theme, setTheme] = useState('light');

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const layouts = useCallback(() => {
    // 这里可以进行基础布局的切换
    // if (location.pathname === '/login') {
    //   return <LoginLayout {...props} />;
    // }
    return <BaseLayout {...props} />;
  }, [location, theme]);

  return <div data-theme={theme}>{layouts()}</div>;
};

export default Layouts;
