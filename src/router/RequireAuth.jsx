import { useLocation, Navigate } from 'react-router-dom'
import useAuth from '../hooks/auth'
import LoadingPage from '../LoadingPage'

export default function RequireAuth({ children }) {
  const auth = useAuth()
  const location = useLocation()

  if (auth.loading) {
    return <LoadingPage />
  }

  if (!auth.isLogin) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
