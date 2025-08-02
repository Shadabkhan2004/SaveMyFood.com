import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
function RefreshHandler({isLoggedIn}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isLoggedIn){
      if(location.pathname==='/login' || location.pathname==='/signup'){
        navigate('/pantry');
      }
    }
  },[location,navigate,isLoggedIn]);
  return (
    null
  )
}

export default RefreshHandler
