import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft'
import Cookie from "js-cookie"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import Navbar from './Component/HomeComponent/Navbar'
import VendorLayout from './Component/vendor/Layout/Layout'
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import LoginPage from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import UserDashboard from './Pages/Client/userDashboard'
import Home from './Pages/Home/Home'
import AdminRoute from './Pages/Routes/AdminRoute'
import AuthRoute from './Pages/Routes/AuthRoute'
import ClientRoute from './Pages/Routes/ClientRoute'
import VendorRoute from './Pages/Routes/VendorRoute'
import api from './Pages/Utils/axiosConfig'
import VendorDahsboard from './Pages/Vendor/VendorDahsboard'
import { setRole, setToken } from './ReduxSlices/slices'
import Foods from './Pages/Vendor/Foods'
import Orders from './Pages/Vendor/Orders'
import RestaurantPage from './Pages/Vendor/Restaurant'
import AdminVendor from './Pages/Admin/AdminVendor'
import AdminUsers from './Pages/Admin/AdminUsers'
import AdminRestaurant from './Pages/Admin/AdminRestaurant'
import AdminLayout from './Component/admin/AdminLayout'

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
  }, [])

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

        <Route element={<AdminLayout> <AdminRoute /></AdminLayout>} >
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-vendor' element={<AdminVendor />} />
          <Route path='/admin-user' element={<AdminUsers />} />
          <Route path='/admin-restaurant' element={<AdminRestaurant />} />
        </Route>

        <Route element={<VendorLayout><VendorRoute /></VendorLayout>}>

          <Route path='/vendor-dashboard' element={<VendorDahsboard />} />
          <Route path='/vendor-restaurant' element={<RestaurantPage />} />
          <Route path="/vendor-food-items" element={<Foods />} />
          <Route path="/vendor-orders" element={<Orders />} />
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
