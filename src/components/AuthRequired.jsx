import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUser, setUser } from '../reduxSlices/userSlice'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'






const AuthRequired = ({children}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
  if(user)
  dispatch(setUser({
    username: user.displayName,
    email: user.email,
    id: user.uid,
  }))
  
  else{
    dispatch(clearUser())
  }
  
    })
  return ()=>unsubscribe()
    
  },[dispatch])



    const {user,isLoading} = useSelector(getUser)


if(!isLoading)
  return user ? children : <Navigate to={'/login'} />
}

export default AuthRequired