import React, { useState } from 'react';
import { Button } from 'antd';
import { renderRoutes } from 'react-router-config';

const Home: React.FC = (props) => {
  const [theme, setTheme] = useState('light');

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <div data-theme={theme} className="homeLayout">
      <Button onClick={handleSwitchTheme}>switch theme</Button>
      {renderRoutes(props.route.routes, { someProp: 'these extra props are optional' })}
    </div>
  );
};

export default Home;
