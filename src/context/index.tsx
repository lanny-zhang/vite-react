import React, { createContext, useState, Dispatch, ReactNode, useMemo } from 'react';

type themeType = 'light' | 'dark';

interface Injected {
  theme: themeType;
  setTheme: Dispatch<themeType>;
  userInfo: any;
  setUserInfo: Dispatch<any>;
  isLogin: boolean;
}

export const ctx = createContext<Injected>({
  theme: 'light',
  setTheme: () => false,
  userInfo: {},
  setUserInfo: () => false,
  isLogin: false,
});

interface Props {
  children?: ReactNode;
}

export function Provider({ children }: Props) {
  const [theme, setTheme] = useState<themeType>('light');
  const [userInfo, setUserInfo] = useState({});
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // useEffect(() => {
  //   //可以异步进行登录状态的修改，没有权限的界面会跳转到登录页面
  //   setTimeout(() => {
  //     setIsLogin(() => false);
  //   }, 3000);
  // }, []);

  const value = useMemo(() => {
    return {
      theme,
      userInfo,
      isLogin,
      setIsLogin,
      setUserInfo,
      setTheme,
    };
  }, [theme, isLogin, userInfo]);

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}
