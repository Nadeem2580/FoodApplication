import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRoute = () => {
  const { role } = useSelector((store) => store.Counter)
  const navigate = useNavigate()
  console.log("role AuthRoute", role)

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin-dashboard")
    } else if (role === "customer") {
      navigate("/user-dashboard")
    } else if (role === "vendor") {
      navigate("/vendor-dashboard")
    }
  }, [role, navigate])

  if (role === null) {
    return <Outlet />
  }


}

export default AuthRoute