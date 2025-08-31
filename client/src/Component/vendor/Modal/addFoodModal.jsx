import * as React from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    MenuItem,
    TextField,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setAddFood, setEditFood, setIsRefresh } from "../../../ReduxSlices/slices";
import api from "../../../Pages/Utils/axiosConfig";
import toastAlert from "../../../Pages/Utils/utils";
import { useEffect } from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
};

const categories = ["Biryani", "Fast Food", "Chiness"];

const schema = yup.object().shape({
    name: yup.string().required("Food name is required"),
    price: yup.number().typeError("Price must be a number").positive().required("Price is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
});



export default function AddFoodModal({ text }) {
    const { isRefresh, addFood, selectedRestaurant, selectedFood, editFood } = useSelector((store) => store.Counter)
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    // Use Hook Form
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: { name: "", price: "", description: "", category: "", available: true, },
        resolver: yupResolver(schema),
    });

    // Handling image and modal
    const handleClose = () => dispatch(setAddFood(false));
    const editClose = () => dispatch(setEditFood(false));
    const imageHandler = (e) => { setImage(e.target.files[0]); };
    // Function for add food item


    useEffect(() => {
        console.log(selectedFood, "selectedFood")
        if (editFood && selectedFood._id) {
            reset(selectedFood)
        } else {
            reset({})
        }
    }, [editFood])

    const onSubmit = async (obj) => {
        try {
            let imageUrl = selectedFood?.imageUrl || null
            if (image) {
                const imageApi = `/api/image-upload`;
                const formData = new FormData();
                formData.append("Image", image);
                const imageResponse = await api.post(imageApi, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                imageUrl = imageResponse.data.data.secure_url;
            }
            const sendObj = {
                ...obj,
                imageUrl: imageUrl || null,
                restaurantId: selectedRestaurant._id,
            };
            if (editFood) {
                console.log("Eidt food item")
                const updateRes = await api.put(`/api/vendor/add-food/${selectedFood._id}`, sendObj)
                console.log(updateRes, "updateRes")
                toastAlert({ message: "Food Updated Successfully", type: "success" });
                editClose();
            } else {
                console.log("create food item")

                const response = await api.post(`/api/vendor/add-food`, sendObj);
                toastAlert({
                    message: "Food Created Successfully",
                    type: "success",
                });
                handleClose()
            }
            console.log("check 1")

            reset({});
            console.log("check 2")

            setImage(null);
            console.log("check 3")

            dispatch(setIsRefresh(!isRefresh))

        } catch (error) {
            console.log(error)
            toastAlert({
                message: error.message || "something went wrong",
                type: "error",
            });
        }
    };

    return (
        <Modal open={addFood || editFood} onClose={editFood ? editClose : handleClose}>
            <Box sx={style}>
                <Typography variant="h6" align="center" gutterBottom>
                    {text}
                </Typography>

                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    {/* Food Name */}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Food Name"
                                fullWidth
                                {...field}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />

                    {/* Price */}
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Price (in Rs)"
                                fullWidth
                                {...field}
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        )}
                    />

                    {/* Description */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Description"
                                multiline
                                rows={3}
                                fullWidth
                                {...field}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />

                    {/* Category */}
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Category"
                                select
                                fullWidth
                                {...field}
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            >
                                {categories.map((cat, idx) => (
                                    <MenuItem key={idx} value={cat}>
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
                            onChange={imageHandler}
                        />
                    </Button>

                    {image && (
                        <Typography variant="body2"> Selected :{image.name}</Typography>
                    )}

                    {/* Availability Toggle */}
                    <Controller
                        name="available"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Switch {...field} checked={field.value} />}
                                label="Available"
                            />
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
