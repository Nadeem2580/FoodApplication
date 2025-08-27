import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios"
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const [refresh, setIsRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [userType, setUserType] = useState(Cookie.get("role") || null)

    useEffect(() => {
        setIsLoading(true)
        const userToken = Cookie.get("token")
        if (userToken) {
            setToken(userToken)
            axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`
            fetchUser()
        } else {
            setIsLoading(false)
        }

    }, [])


    const fetchUser = async () => {
        try {
            const res = await axios.get("/api/auth/single-user");
            const role = res.data?.data
            setUserType(role);
            // Cookie.set("role", role);
        } catch (error) {
            console.log("Error fetching user:", error);
            setUserType(null);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        refresh, setIsRefresh, isLoading, setIsLoading, axios, navigate, setUserType, userType, fetchUser
    }


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>


}

const useAppContext = () => {
    return useContext(AppContext)
}

export default useAppContext