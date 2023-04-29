import React from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../reduxSlices/userSlice'
import { Navigate } from 'react-router-dom'






const AuthRequired = ({children}) => {
    const {user,isLoading} = useSelector(getUser)
  


if(!isLoading)
  return user ? children : <Navigate to={'/login'} />
}

export default AuthRequired