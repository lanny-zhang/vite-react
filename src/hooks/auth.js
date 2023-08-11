import { useContext, useState, useEffect } from 'react'
import { ctx } from '@/context'

const useAuth = () => {
  const {
    setIsLogin, isLogin, setUserInfo, userInfo,
  } = useContext(ctx)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLogin === false) {
      // 模拟请求
      setTimeout(() => {
        const login = localStorage.getItem('login')
        setIsLoading(() => false)
        if (login === 'true') {
          setIsLogin(() => true)
        }
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }, [])

  function signin(username, callback) {
    setIsLoading(true)
    setTimeout(() => {
      const info = { name: username }
      localStorage.setItem('login', 'true')
      setIsLogin(() => true)
      setIsLoading(() => false)
      setUserInfo(() => info)
      callback(info)
    }, 1000) // fake async
  }

  function signout(callback) {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('login', 'false')
      setIsLoading(false)
      setIsLogin(false)
      setUserInfo(null)
      callback()
    }, 1000)
  }

  return {
    signin,
    signout,
    isLogin,
    userInfo,
    loading,
  }
}

export default useAuth
