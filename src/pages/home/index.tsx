import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { testRequest } from './services/index';
import styles from './index.module.less';

const Home: React.FC = () => {
  const history: any = useHistory();

  useEffect(() => {
    testRequest();
  }, []);

  function goPage(): void {
    history.push('/login');
  }

  return (
    <div className={styles.home}>
      Hello World
      <br />
      <Button type="primary" onClick={goPage}>
        路由跳转
      </Button>
    </div>
  );
};

export default Home;
