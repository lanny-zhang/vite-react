import React, { createContext, useState, useMemo } from 'react'

export const ctx = createContext({
  theme: localStorage.getItem('theme') || 'light',
  setTheme: () => false,
  userInfo: {},
  setUserInfo: () => false,
  isLogin: false,
})

export function Provider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [userInfo, setUserInfo] = useState({})
  const [isLogin, setIsLogin] = useState(false)

  const handleTheme = (e) => {
    setTheme(e)
    localStorage.setItem('theme', e)
  }

  const value = useMemo(() => {
    return {
      theme,
      userInfo,
      isLogin,
      setIsLogin,
      setUserInfo,
      setTheme: handleTheme,
    }
  }, [theme, isLogin, userInfo])

  return <ctx.Provider value={value}>{children}</ctx.Provider>
}
