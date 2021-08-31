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
    if (location.pathname === '/login') {
      return <div>sdfsdf</div>;
    }
    return <BaseLayout {...props} />;
  }, [location, theme]);

  return <div data-theme={theme}>{layouts()}</div>;
};

export default Layouts;
