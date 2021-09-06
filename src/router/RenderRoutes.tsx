import React, { useCallback, useContext } from 'react';
import { RouteConfig } from 'react-router-config';
import { ctx } from '@/context';
import { Route, Redirect, Switch } from 'react-router-dom';

interface renderRoutesProps {
  routes: RouteConfig[] | undefined;
  authPath?: string;
  extraProps?: any;
  switchProps?: any;
}

// 重写renderRoutes方法，支持登录鉴权
export default function RenderRoutes({
  routes,
  authPath = '/login',
  extraProps = {},
  switchProps = {},
}: renderRoutesProps) {
  const { isLogin: authed } = useContext(ctx);

  const renderRedict = useCallback(() => {
    return routes?.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => {
          if (route.render) {
            return route.render(props);
          } else {
            if (!route.requiresAuth || authed || route.path === authPath) {
              return route.component ? <route.component {...props} {...extraProps} route={route} /> : null;
            }
            return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
          }
        }}
      />
    ));
  }, [authed]);

  return (
    <Switch {...switchProps}>
      {renderRedict()}
    </Switch>
  );
}
