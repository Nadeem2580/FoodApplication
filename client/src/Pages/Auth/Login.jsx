import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Cookie from "js-cookie";
import { useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import toastAlert from "../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../../ReduxSlices/slices";
import api from "../Utils/axiosConfig";

const LoginPage = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { role } = useSelector((store) => store.Counter)

    let dispatch = useDispatch()
    const loginSchema = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const { handleSubmit, formState: { errors }, control, reset, } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const submitLogin = async (obj) => {
        try {
            const res = await api.post("/api/auth/login", obj)
            let userRole;
            if (!res.data.status) {
                return toastAlert({
                    type: "false",
                    message: res.data.message
                })
            }
            userRole = res.data.data.type
            Cookie.set("token", res.data.token)
            Cookie.set("role", userRole)
            dispatch(setRole(userRole))
            toastAlert({
                type: "success",
                message: "Congratulation! for the login"
            })

            if (userRole == "admin") { navigate("/admin-dashboard") }
            if (userRole == "vendor") { navigate("/vendor-dashboard") }
            if (userRole == "customer") { navigate("/user-dashboard") }

            reset()
        } catch (error) {
            toastAlert({
                type: "error",
                message: error.response?.data?.message
            })
        }
    }


    return (
        <Stack justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
            <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" } }}>
                <AnimatePresence mode="wait">
                    <motion.div key="login" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }} transition={{ duration: 0.5 }}
                        style={{ padding: 30, background: "white", borderRadius: 10, boxShadow: "0 0 20px #95ca4d", }}>
                        <Typography align="center" fontSize={24} sx={{ fontSize: "25px", fontWeight: "700", color: "#3b82f6" }}>Login</Typography>
                        <form onSubmit={handleSubmit(submitLogin)}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Email" fullWidth margin="normal"
                                        {...field} error={!!errors.email}
                                        helperText={errors.email?.message} />)} />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.password}
                                    >
                                        <InputLabel>Password</InputLabel>
                                        <OutlinedInput
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff sx={{ color: "#3b82f6" }} />
                                                        ) : (
                                                            <Visibility sx={{ color: "#3b82f6" }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText>
                                            {errors.password?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, background: "#3b82f6" }} >   Login</Button>
                            <Button sx={{ mt: 1 }}>
                                <Typography variant="caption">
                                    Create new account <Link to={"/signup"} style={{ color: "#8dc63f", textDecoration: "none" }}>Sing up</Link>
                                </Typography>
                            </Button>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Stack>
    );
};

export default LoginPage;
