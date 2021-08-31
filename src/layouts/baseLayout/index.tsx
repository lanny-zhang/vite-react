import React, { useState } from 'react';
import { Button } from 'antd';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

const BaseLayout: React.FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;
  const [theme, setTheme] = useState('light');

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <div data-theme={theme} className="baseLayout">
      <Button onClick={handleSwitchTheme}>switch theme</Button>
      {renderRoutes(route?.routes, { someProp: 'these extra props are optional' })}
    </div>
  );
};

export default BaseLayout;
