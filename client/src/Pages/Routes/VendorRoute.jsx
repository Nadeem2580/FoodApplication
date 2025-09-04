import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const VendorRoute = () => {
  const { role } = useSelector((store) => store.Counter)
  const navigate = useNavigate()

  console.log("role VendorRoute", role)

  useEffect(() => {
    if (role === "admin") {
      navigate("/admin-dashboard")
    } else if (role === "customer") {
      navigate("/user-dashboard")
    } else if (!role) {
      navigate("/")
    }
  }, [navigate, role])

  if (role === "vendor") {
    return <Outlet />
  }
  return null
};

export default VendorRoute;
