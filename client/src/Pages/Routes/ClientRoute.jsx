import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ClientRoute = () => {
    const { role } = useSelector((store) => store.Counter)
    const navigate = useNavigate()

    useEffect(() => {
        if (role === "admin") {
            navigate("/admin-dashboard")
        } else if (role === "vendor") {
            navigate("/vendor-dashboard")
        }
    }, [role, navigate])

    if (role === "customer") {
        return <Outlet />

    }
}
export default ClientRoute