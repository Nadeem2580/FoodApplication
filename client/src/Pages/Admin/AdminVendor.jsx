import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VendorTable } from '../../Component/admin/AdminTable'


const AdminVendor = () => {
  const { vendor } = useSelector((store) => store.Admin)
  const userHeader = ["_id", "Full Name", "Type", "Email", "Status", "action"]

  return (
    <VendorTable header={userHeader} data={vendor} show={true} />
  )
}

export default AdminVendor



