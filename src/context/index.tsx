import React, { createContext, useState, Dispatch, ReactNode, useMemo } from 'react';

type themeType = 'light' | 'dark';

interface Injected {
  theme: themeType;
  setTheme: Dispatch<themeType>;
  userInfo: any;
  setUserInfo: Dispatch<any>;
}

export const ctx = createContext<Injected>({
  theme: 'light',
  setTheme: () => false,
  userInfo: {},
  setUserInfo: () => false,
});

interface Props {
  children?: ReactNode;
}

export function Provider({ children }: Props) {
  const [theme, setTheme] = useState<themeType>('light');
  const [userInfo, setUserInfo] = useState({});

  const value = useMemo(() => {
    return {
      theme,
      userInfo,
      setUserInfo,
      setTheme,
    };
  }, [theme]);

  return <ctx.Provider value={value}>{children}</ctx.Provider>;
}
