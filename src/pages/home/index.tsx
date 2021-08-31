import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { testRequest } from './services/index';
import './index.less';

const Home: React.FC = () => {
  let history: any;
  history = useHistory();

  useEffect(() => {
    testRequest();
  }, []);

  function goPage(): void {
    history.push('/example');
  }

  return (
    <div className="home">
      Hello World
      <br />
      <Button type="primary" onClick={goPage}>
        路由跳转
      </Button>
    </div>
  );
};

export default Home;
