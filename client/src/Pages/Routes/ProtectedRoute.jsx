import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ userType, allowedRole }) => {
    // // Agar userType abhi null hai to wait karo
    // console.log(userType)
    // if (userType === null) {
    //     return <p>Loading...</p>; // ya spinner show kar sakte ho
    // }

    // // Agar userType match nahi karta to login bhejo
    // if (userType !== allowedRole) {
    //     return <Navigate to="/login" replace />;
    // }

    // // Agar sab match karta hai to nested route dikhao
    // return <Outlet />;
};

export default ProtectedRoute;
