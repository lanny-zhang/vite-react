import React, { useContext, useEffect } from 'react';
import { Button } from 'antd';
import { ctx } from '@/context';
import { RouteConfigComponentProps } from 'react-router-config';
import { RenderRoutes } from '@/router';
import styles from './index.module.less';

const BaseLayout: React.FC<RouteConfigComponentProps> = (props) => {
  const { route, history } = props;
  const { setTheme, theme } = useContext(ctx);

  useEffect(() => {
    // 这里可以进行登录拦截
    const isLogin = true;
    if (!isLogin) {
      history.push('/login');
    }
  }, []);

  function handleSwitchTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <div data-theme={theme} className={styles['base-layout-wrap']}>
      <header>
        <Button onClick={handleSwitchTheme}>switch theme</Button>
      </header>
      <RenderRoutes routes={route?.routes} extraProps={{ somprops: 'ahther props' }} />
      <footer>footer</footer>
    </div>
  );
};

export default BaseLayout;
