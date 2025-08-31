import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, Box, Button, Fade, MenuItem, Modal, TextField, Typography, } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import api from "../../../Pages/Utils/axiosConfig";
import toastAlert from "../../../Pages/Utils/utils";
import { setCreateResModal, setIsRefresh } from "../../../ReduxSlices/slices";
import { useEffect } from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

const categories = ["Fast food", "Bar B.Q", "Deserts", "Karahi", "Chinese", "Italian"];

const CreateRestaurant = ({ open, isRefresh, restaurant }) => {
    const dipatch = useDispatch()
    const schema = yup.object({
        restaurantName: yup.string().required(),
        details: yup.string().required(),
        contactNumber: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().required(),
        category: yup.string().required(),
    });
    const [image, setImage] = useState(null);
    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            restaurantName: "",
            details: "",
            contactNumber: "",
            address: "",
            email: "",
            category: "",
        },
        resolver: yupResolver(schema),
    });

    const handleClose = () => dipatch(setCreateResModal(false));

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        if (restaurant && restaurant._id) {
            reset(restaurant)
        } else {
            reset({})
        }
    }, [restaurant,reset])

    const onSubmit = async (formDataValues) => {
        try {

            let imageUrl = restaurant?.imageUrl || null

            if (image) {
                const imageApi = `/api/image-upload`;
                const formData = new FormData();
                formData.append("image", image);

                const imageResponse = await api.post(imageApi, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                imageUrl = imageResponse.data.data.secure_url;
            }
            const objToSend = {
                ...formDataValues,
                imageUrl: imageUrl || null,
            };

            let response;
            if (restaurant && restaurant._id) {
                response = await api.put(`/api/vendor/restaurant/${restaurant._id}`, objToSend);
                toastAlert({ message: "Restaurant Updated Successfully", type: "success" });
            } else {
                response = await api.post(`/api/vendor/restaurant`, objToSend);
                toastAlert({
                    message: "Restaurant Created Successfully",
                    type: "success",
                });

            }

            handleClose();
            reset({});
            dipatch(setIsRefresh(!isRefresh))
        } catch (error) {
            toastAlert({ message: error.message, type: "error" });
        }
    };



    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <Typography
                            variant="h5"
                            textAlign="center"
                            color="warning"
                            sx={{ textDecoration: "underline" }}
                        >
                            Register Your Restaurant
                        </Typography>

                        <Controller
                            name="restaurantName"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    label="Restaurant Name"
                                    fullWidth
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="details"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    label="Detail"
                                    multiline
                                    minRows={3}
                                    fullWidth
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="contactNumber"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    label="Contact"
                                    fullWidth
                                    {...field}
                                    error={error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="address"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    label="Address"
                                    fullWidth
                                    {...field}
                                    error={error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    label="Email"
                                    fullWidth
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />

                        <Controller
                            name="category"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    select
                                    label="Category"
                                    fullWidth
                                    {...field}
                                    error={!!error}
                                    helperText={error?.message}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Button variant="outlined" component="label">
                            Upload Logo
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                name="logo"
                                onChange={handleChange}
                            />
                        </Button>

                        {image && (
                            <Typography variant="body2" color="text.secondary">
                                Selected file: {image.name}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CreateRestaurant