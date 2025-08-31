import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

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