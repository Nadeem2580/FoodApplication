import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const AppContext = createContext()


export const AppProvider = ({children}) => {
    const [refresh, setIsRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [token , setToken] = useState(null)

    const value = {
        refresh, setIsRefresh, isLoading, setIsLoading
    }


    return <AppContext.Provider value={value}>{children}</AppContext.Provider>


}

const useAppContext = () => {
    return useContext(AppContext)
}

export default useAppContext