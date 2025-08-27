import { Navigate, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import useAppContext from '../Context/Context'
import './App.css'
import LoginPage from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import UserDashboard from './Pages/Client/userDashboard'
import Home from './Pages/Home/Home'
import AdminRoute from './Pages/Routes/AdminRoute'
import AuthRoute from './Pages/Routes/AuthRoute'
import ClientRoute from './Pages/Routes/ClientRoute'
import VendorRoute from './Pages/Routes/VendorRoute'
import VendorDahsboard from './Pages/Vendor/VendorDahsboard'
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import { useSelector, useDispatch } from 'react-redux'
import { addCount, setRole, setToken } from './ReduxSlices/slices'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import axios from "axios"
import Cookie from "js-cookie"
import Navbar from './Component/Navbar'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ContactsIcon from '@mui/icons-material/Contacts';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
function App() {

  const { token, role } = useSelector((store) => store.Counter)
  let dispatch = useDispatch()

  useEffect(() => {
    const token = Cookie.get("token")
    const userRole = Cookie.get("role")
    if (token) {
      dispatch(setToken(token))
      dispatch(setRole(userRole))
    }
  }, [role])

 const homeLink = [
    { title: "Home", url: "/Home", icon: <HomeIcon fontSize="small" /> },
    { title: "Restaurants", url: "/restaurants", icon: <RestaurantMenuIcon fontSize="small" /> },
    { title: "About", url: "/about", icon: <RoundaboutLeftIcon fontSize="small" /> },
    { title: "Contact", url: "/contact", icon: <ContactsIcon fontSize="small" /> },
  ];

  return (
    <>
      <Routes>

        <Route element={<AuthRoute />}>
        <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>

        <Route element={<AdminRoute />} >
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Route>

        <Route element={<VendorRoute />}>

          <Route path='/vendor-dashboard' element={<VendorDahsboard />} />
        </Route>

        <Route element={<ClientRoute />}>

          <Route path='/user-dashboard' element={<Navbar links={homeLink}><UserDashboard /></Navbar>} />
        </Route>

      </Routes >



      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
