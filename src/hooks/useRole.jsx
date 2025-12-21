import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../providers/AuthContext'

const useRole = () => {
  const { user } = useContext(AuthContext)
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/user/role/${user.email}`)
        .then(res => setRole(res.data))
        .catch(err => console.error('Error fetching role:', err))
    }
  }, [user])

  return {role}
}

export default useRole
