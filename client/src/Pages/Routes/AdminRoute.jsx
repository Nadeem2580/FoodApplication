import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAppContext from '../../../Context/Context'
import Loading from '../../../Loader/Loading'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
    const { role } = useSelector((store) => store.Counter)
    const navigate = useNavigate()
    console.log("role admin", role)

    useEffect(() => {
        if (role === "vendor") {
            navigate("/vendor-dashboard")
        } else if (role === "customer") {
            navigate("/user-dashboard")
        } else if (!role) {
            navigate("/")
        }
    }, [role, navigate])

    if (role === "admin") {
        return <Outlet />
    }

    return null //
}

export default AdminRoute