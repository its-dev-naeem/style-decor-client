import { useContext } from 'react'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../providers/AuthContext'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) return <LoadingSpinner />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute