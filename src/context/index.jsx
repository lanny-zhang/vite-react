import React, {
  createContext, useState, Dispatch, ReactNode, useMemo,
} from 'react'

export const ctx = createContext({
  theme: 'light',
  setTheme: () => false,
  userInfo: {},
  setUserInfo: () => false,
  isLogin: false,
})

export function Provider({ children }) {
  const [theme, setTheme] = useState('light')
  const [userInfo, setUserInfo] = useState({})
  const [isLogin, setIsLogin] = useState(true)

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
    }
  }, [theme, isLogin, userInfo])

  return <ctx.Provider value={value}>{children}</ctx.Provider>
}
