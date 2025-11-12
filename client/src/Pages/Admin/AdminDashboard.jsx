import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RestaurantDashboard, UserTable, VendorTable } from '../../Component/admin/AdminTable'
import { setRestaurant, setUsers, setVendor } from '../../ReduxSlices/adminSlices'
import api from '../Utils/axiosConfig'
import toastAlert from '../Utils/utils'
const AdminDashboard = () => {
  const { isRefresh, users, restaurant, vendor } = useSelector((store) => store.Admin)
  const dispatch = useDispatch()
  const userHeader = ["_id", "Full Name", "Type", "Email", "Status"]
  const restaurantHeader = ["_id", "Restaurant Name", "Category", "Email", "Contact Number", "Address", "Details", "Address"]

  useEffect(() => {
    fetchUser()
  }, [isRefresh])

  const fetchUser = async () => {
    try {
      const fetchUser = await api.get("/api/admin/users")
      const fetchRestaurant = await api.get("/api/admin/restaurants")
      const usersData = fetchUser.data.data
      const restaurantData = fetchRestaurant.data.data

      const customers = usersData.filter((item) => item.type === "customer")
      const vendors = usersData.filter((item) => item.type === "vendor")

      // Dispatch to Redux
      dispatch(setUsers(customers))
      dispatch(setVendor(vendors))
      dispatch(setRestaurant(restaurantData))


    } catch (error) {

      toastAlert({
        message: error.message,
        type: "error"
      })
    }
  }

  return (
    <>
      <Box sx={{ margin: "30px 0" }}>
        <Typography variant='h5' textAlign="center" fontWeight={"bold"}>All Users</Typography>
        <UserTable header={userHeader} data={users} />
      </Box>
      <Box sx={{ margin: "30px 0" }}>
        <Typography variant='h5' textAlign="center" fontWeight={"bold"}>All Vendors</Typography>

        <VendorTable header={userHeader} data={vendor} />
      </Box>
      <Box sx={{ margin: "30px 0" }}>
        <Typography variant='h5' textAlign="center" fontWeight={"bold"}>All Restaurats</Typography>

        <RestaurantDashboard header={restaurantHeader} data={restaurant} />
      </Box>
    </>
  )
}

export default AdminDashboard