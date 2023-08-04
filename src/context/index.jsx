import React, { createContext, useState, useMemo } from 'react'

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
  const [isLogin, setIsLogin] = useState(false)

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
