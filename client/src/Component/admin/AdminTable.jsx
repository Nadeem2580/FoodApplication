import { Button, FormControlLabel, Switch } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../Pages/Utils/axiosConfig';
import toastAlert from '../../Pages/Utils/utils';
import { setIsRefresh, setRestaurant, setUsers, setVendor } from '../../ReduxSlices/adminSlices';
import { setSelectedRestaurant } from '../../ReduxSlices/slices';
import ContentModal from './Modal';


export function UserTable({ header, data, show }) {
    const { isRefresh } = useSelector((store) => store.Admin)
    const dispatch = useDispatch()
    const userUpdate = async (data) => {
        try {
            const obj = {
                isVerified: !data.isVerified,
            }
            const userUpdate = await api.patch(`/api/admin/updat-content/${data._id}`, obj)
            console.log(userUpdate, "userUpdate")
            toastAlert({
                message: "User Updated",
                type: "success"
            })

            const fetchUser = await api.get("/api/admin/users")
            const usersData = fetchUser.data.data
            const customers = usersData.filter((item) => item.type === "customer")
            dispatch(setUsers(customers))
        } catch (error) {
            toastAlert({
                message: error.message,
                type: "error"
            })
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        {
                            header.map((item) => (
                                <TableCell key={item} align="center" sx={{ backgroundColor: "#8dc63f", color: "#fff", fontWeight: "800" }}> {item}</TableCell>
                            ))
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {/* _id */}
                            <TableCell align="center">{item._id}</TableCell>

                            {/* Full Name */}
                            <TableCell align="center">{item.fullName}</TableCell>

                            {/* Type */}
                            <TableCell align="center">{item.type}</TableCell>

                            {/* Email */}
                            <TableCell align="center">{item.email}</TableCell>

                            {/* Status */}
                            <TableCell align="center">
                                {item.isVerified ? "Active" : "Inactive"}
                            </TableCell>

                            {/* Action buttons */}
                            {show && <TableCell align="center">
                                <Button sx={{ fontSize: "10px", fontWeight: "700", backgroundColor: "#3b82f6", color: "#fff" }}
                                    onClick={() => userUpdate(item)}

                                >
                                    {item.isVerified ? "Approve" : "Reject"}
                                </Button>
                            </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}


export function VendorTable({ header, data, show }) {

    const { isRefresh } = useSelector((store) => store.Admin)
    const dispatch = useDispatch()

    const vendorUpdate = async (data) => {
        try {
            const obj = {
                isVerified: !data.isVerified,
            }
            const userUpdate = await api.patch(`/api/admin/updat-content/${data._id}`, obj)
            console.log(userUpdate, "userUpdate")
            toastAlert({
                message: "User Updated",
                type: "success"
            })
            const fetchUser = await api.get("/api/admin/users")
            const usersData = fetchUser.data.data
            const vendors = usersData.filter((item) => item.type === "vendor")
            dispatch(setVendor(vendors))
        } catch (error) {
            toastAlert({
                message: error.message,
                type: "error"
            })
        }
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        {
                            header.map((item) => (
                                <TableCell key={item} align="center" sx={{ backgroundColor: "#8dc63f", color: "#fff", fontWeight: "800" }}> {item}</TableCell>
                            ))
                        }

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {/* _id */}
                            <TableCell align="center">{item._id}</TableCell>

                            {/* Full Name */}
                            <TableCell align="center">{item.fullName}</TableCell>

                            {/* Type */}
                            <TableCell align="center">{item.type}</TableCell>

                            {/* Email */}
                            <TableCell align="center">{item.email}</TableCell>

                            {/* Status */}
                            <TableCell align="center">
                                {item.isVerified ? "Active" : "Inactive"}
                            </TableCell>

                            {/* Action buttons */}
                            {show && <TableCell align="center">
                                <Button sx={{ fontSize: "10px", fontWeight: "700", backgroundColor: "#3b82f6", color: "#fff" }}
                                    onClick={() => vendorUpdate(item)}
                                >
                                    {item.isVerified ? "Approve" : "Reject"}
                                </Button>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}


export function RestaurantDashboard({ header, data, show }) {
    console.log(header, "header")
    const [openDetail, setOpenDetail] = React.useState(false);
    const [openAddress, setOpenAddress] = React.useState(false);
    const dispatch = useDispatch()
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            {
                                header.map((item) => (
                                    <TableCell key={item} align="center" sx={{ backgroundColor: "#8dc63f", color: "#fff", fontWeight: "800" }}> {item}</TableCell>
                                ))
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {/* _id */}
                                <TableCell align="center">{item._id}</TableCell>

                                {/* Full Name */}
                                <TableCell align="center">{item.restaurantName}</TableCell>

                                {/* Type */}
                                <TableCell align="center">{item.category}</TableCell>

                                {/* Email */}
                                <TableCell align="center">{item.email}</TableCell>

                                {/* Status */}
                                <TableCell align="center">
                                    {item.approvedStatus ? "Approved" : item.approvedStatus === "pending" ? "pending" : "rejected"}
                                </TableCell>

                                <TableCell align="center">{item.contactNumber}</TableCell>
                                <TableCell align="center"><Button onClick={() => { setOpenDetail(true); dispatch(setSelectedRestaurant(item)) }} sx={{ fontSize: "13px", textTransform: "capitalize", backgroundColor: "#3b82f6", color: "#fff" }}>Detail</Button></TableCell>
                                <TableCell align="center"><Button onClick={() => { setOpenAddress(true); dispatch(setSelectedRestaurant(item)); }} sx={{ fontSize: "13px", textTransform: "capitalize", backgroundColor: "#3b82f6", color: "#fff" }}>Address</Button></TableCell>
                                {/* Action buttons */}
                                {show && <TableCell align="center">
                                    <button
                                        onClick={() => RestaurantUpdate(item)}
                                    >
                                        Action
                                    </button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            {(openDetail || openAddress) && <ContentModal openDetail={openDetail} openAddress={openAddress} setOpenDetail={setOpenDetail} setOpenAddress={setOpenAddress} />}
        </>
    );
}


export function RestaurantTable({ header, data, show }) {
    const [openDetail, setOpenDetail] = React.useState(false);
    const [openAddress, setOpenAddress] = React.useState(false);

    const { isRefresh } = useSelector((store) => store.Admin)
    const dispatch = useDispatch()

    const RestaurantUpdate = async (data, check) => {
        try {

            console.log(check, "check")
            if (check == "isopen") {

                const obj = {
                    isOpen: !data.isOpen,
                }

                const userUpdate = await api.patch(`/api/admin/updat-restaurant/${data._id}`, obj)
                toastAlert({
                    message: `Status is updated`,
                    type: "success"
                })
            }
            if (check === "approve") {
                const obj = {
                    approvedStatus: data.approvedStatus === "approved" ? "rejected" : "approved"
                }
                const userUpdate = await api.patch(`/api/admin/updat-restaurant/${data._id}`, obj)
                toastAlert({
                    message: `Status is updated`,
                    type: "success"
                })

            }
            const fetchRestaurant = await api.get("/api/admin/restaurants")
            dispatch(setRestaurant(fetchRestaurant.data.data))
            dispatch(setIsRefresh(!isRefresh))
        } catch (error) {
            toastAlert({
                message: error.message,
                type: "error"
            })
        }
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            {
                                header.map((item) => (
                                    <TableCell key={item} align="center" sx={{ backgroundColor: "#8dc63f", color: "#fff", fontWeight: "800" }}> {item}</TableCell>
                                ))
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {/* _id */}
                                <TableCell align="center">{item._id}</TableCell>

                                {/* Full Name */}
                                <TableCell align="center">{item.restaurantName}</TableCell>

                                {/* Type */}
                                <TableCell align="center">{item.category}</TableCell>

                                {/* Email */}
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center">{item.contactNumber}</TableCell>
                                <TableCell align="center"><Button onClick={() => { setOpenDetail(true); dispatch(setSelectedRestaurant(item)) }} sx={{ fontSize: "13px", textTransform: "capitalize" }}>Detail</Button></TableCell>
                                <TableCell align="center"><Button onClick={() => { setOpenAddress(true); dispatch(setSelectedRestaurant(item)); }} sx={{ fontSize: "13px", textTransform: "capitalize" }}>Address</Button></TableCell>

                                {/* Status */}
                                <TableCell align="center">
                                    {item.approvedStatus}
                                </TableCell>
                                <TableCell align="center" > <FormControlLabel control={<Switch checked={item.isOpen} onChange={() => RestaurantUpdate(item, "isopen")} />} label={item.isOpen == true ? "Open" : "Closed"} /></TableCell>


                                {/* Action buttons */}
                                {<TableCell align="center">
                                    <Button sx={{ fontSize: "10px", fontWeight: "700", backgroundColor: "#3b82f6", color: "#fff" }}
                                        onClick={() => RestaurantUpdate(item, "approve")}
                                    >
                                        {item.approvedStatus === "approved" ? "Rejected" : item.approvedStatus === "pending" ? "Pending" : "Approved"}
                                    </Button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            {(openDetail || openAddress) && <ContentModal openDetail={openDetail} openAddress={openAddress} setOpenDetail={setOpenDetail} setOpenAddress={setOpenAddress} />}
        </>



    );
}