import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes(props) {
  return (
    <div>
      {
        props.isLoggedIn ?
        <Outlet />
        :
        <Navigate to="/signup" />
      }
    </div>
  )
}

export default ProtectedRoutes