import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Example: React.FC = () => {
  let history: any;
  history = useHistory();

  function goPage(): void {
    history.push('/example/');
  }

  return (
    <div className="home">
      Hello World
      <br />
      <Button type="primary" onClick={goPage}>
        嵌套路由跳转
      </Button>
    </div>
  );
};

export default Example;
