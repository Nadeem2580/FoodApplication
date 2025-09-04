import { useSelector } from 'react-redux'
import { RestaurantTable } from '../../Component/admin/AdminTable'

const AdminRestaurant = () => {
  const {restaurant } = useSelector((store) => store.Admin)
  const restaurantHeader = ["_id", "Restaurant Name", "Category", "Email", "Contact Number", "Details", "Address", "Status", "IsOpen", "Action"]

  return (
    <>
      <RestaurantTable header={restaurantHeader} data={restaurant} />
    </>
  )
}

export default AdminRestaurant