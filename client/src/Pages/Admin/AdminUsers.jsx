import { useDispatch, useSelector } from 'react-redux'
import { UserTable } from '../../Component/admin/AdminTable'

const AdminUsers = () => {
  const { users } = useSelector((store) => store.Admin)
const userHeader = ["_id", "Full Name", "Type", "Email", "Status", "action"]
  return (
   <UserTable header={userHeader} data={users} show={true} />
  )
}

export default AdminUsers