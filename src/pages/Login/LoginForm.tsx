import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Link, Alert } from "@mui/material";
import type { JSX } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import  AuthContext  from "../../context/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}
export default function LoginForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  console.log("Logging in");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!; // get login function from context - Using non-null assertion(!) because we are sure it's within a provider

 const onSubmit = async (data: LoginFormInputs) => {
  setErrorMsg("");

  try {
    const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        email: data.email,
        password: data.password,
      }
    );

    const user = response.data;
    localStorage.setItem("userId", String(user.id));
    login(user.role);
    navigate("/home");
  } catch (error) {
    setErrorMsg("Invalid email or password.");
  }
};

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Login to Fruit Fantasy
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
      </form>

      <Typography variant="body2" align="center">
        New user?{" "}
        <Link component={RouterLink} to="/register" underline="hover">
          Sign up here
        </Link>
      </Typography>
    </Box>
  );
}
