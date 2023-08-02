import { useContext } from 'react'
import { ctx } from '@/context'

const useAuth = () => {
  const {
    setIsLogin, isLogin, setUserInfo, userInfo,
  } = useContext(ctx)

  function signin(username, callback) {
    setIsLogin(true)
    setUserInfo({ name: username })
    setTimeout(callback, 100) // fake async
  }

  function signout(callback) {
    setIsLogin(false)
    setUserInfo(null)
    setTimeout(callback, 100)
  }

  return {
    signin,
    signout,
    isLogin,
    userInfo,
  }
}

export default useAuth
