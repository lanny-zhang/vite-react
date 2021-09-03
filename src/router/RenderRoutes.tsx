import React, { useContext } from 'react';
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
export default function renderRoutes({
  routes,
  authPath = '/login',
  extraProps = {},
  switchProps = {},
}: renderRoutesProps) {
  const authed = false;
  // const { isLogin: authed = false } = useContext(ctx);

  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
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
                return <route.component {...props} {...extraProps} route={route} />;
              }
              return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
            }
          }}
        />
      ))}
    </Switch>
  ) : null;
}
