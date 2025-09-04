import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import api from "../Utils/axiosConfig";
import toastAlert from "../Utils/utils";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const signUpSchema = yup.object({

    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
    type: yup.string().required(),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
    }
  });

  const submitSignup = async (obj) => {
    try {
      const user = await api.post("/api/auth/signup", obj)
      toastAlert({
        type: "success",
        message: "Congratulation! Successfully Sign up",
      })
      reset()
    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || "Something went wrong",
      })
    }
  }


  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >

      <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" } }}>

        <AnimatePresence mode="wait">


          <motion.div
            key="signup"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: 30,
              background: "white",
              borderRadius: 10,
              boxShadow: "0 0 20px #95ca4d",
            }}
          >
            <Typography align="center" fontSize={24} sx={{ color: "#3b82f6", fontWeight: "700" }}>
              Signup
            </Typography>
            <form onSubmit={handleSubmit(submitSignup)}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
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
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                  >
                    <InputLabel>Confirm Password</InputLabel>
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
                      {errors.confirmPassword?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.type}
                  >
                    <Typography>Choose role:</Typography>
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="vendor"
                        control={<Radio />}
                        label="Vendor"
                      />
                      <FormControlLabel
                        value="customer"
                        control={<Radio />}
                        label="Customer"
                      />
                    </RadioGroup>
                    <FormHelperText>{errors.type?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <Button

                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, background: "#3b82f6" }}
              >
                Signup
              </Button>
              <Button sx={{ mt: 1 }}>
                <Typography variant="caption">
                  Already have an account?  <Link style={{ color: "#8dc63f", textDecoration: "none" }} to={"/login"} >Log in</Link>
                </Typography>
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      </Box>

    </Stack>


  )
}

export default SignUp