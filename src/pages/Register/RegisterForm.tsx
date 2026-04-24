import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";

type RegistrationInputs = User & {
  _confirmPassword: string;
};

export default function RegisterForm(): JSX.Element {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<RegistrationInputs>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      state: "",
      dob: "",
      username: "",
      password: "",
      _confirmPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();
  type Step = "account" | "personal" | "review";
  const [step, setStep] = useState<Step>("account");

  // const [step, setStep] = useState(1);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data: RegistrationInputs) => {
    const { _confirmPassword, ...userData } = data; // strip confirmPassword
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users`,
        userData,
      );
      setSnackbar({
        open: true,
        type: "success",
        message: "Registration successful!",
      });
      console.log("Registration success:", response.data);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration error:", error);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to register. Please try again.",
      });
    }
  };

  const handleNext = async (targetStep: Step) => {
    const isValid = await trigger(); // checks current fields
    if (isValid) setStep(targetStep);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0e9d6" }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, maxWidth: 500, width: "100%", borderRadius: 3 }}
      >
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          User Registration
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Account Details */}
          {step === "account" && (
            <>
              <Controller
                name="username"
                control={control}
                rules={{ required: "username is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="_confirmPassword"
                control={control}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors._confirmPassword}
                    helperText={errors._confirmPassword?.message}
                  />
                )}
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="contained"
                  onClick={() => handleNext("personal")}
                  disabled={
                    !!errors.username ||
                    !!errors.password ||
                    !!errors._confirmPassword
                  }
                >
                  Next →
                </Button>
              </Box>
            </>
          )}

          {/* Step 2: Personal Details */}
          {step === "personal" && (
            <>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone must be 10 digits",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    type="tel"
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />

              <FormControl margin="normal">
                <FormLabel>Gender</FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.gender && (
                  <Typography variant="body2" color="error">
                    {errors.gender.message}
                  </Typography>
                )}
              </FormControl>

              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="state-label">State</InputLabel>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <Select {...field} labelId="state-label">
                      <MenuItem value="">--Select State--</MenuItem>
                      <MenuItem value="Delhi">Delhi</MenuItem>
                      <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                      <MenuItem value="Karnataka">Karnataka</MenuItem>
                      <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                      <MenuItem value="West Bengal">West Bengal</MenuItem>
                    </Select>
                  )}
                />
                {errors.state && (
                  <Typography variant="body2" color="error">
                    {errors.state.message}
                  </Typography>
                )}
              </FormControl>

              <Controller
                name="dob"
                control={control}
                rules={{ required: "Date of birth is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dob}
                    helperText={errors.dob?.message}
                  />
                )}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <Select {...field} labelId="role-label">
                      <MenuItem value="">--Select Role--</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <Typography variant="body2" color="error">
                    {errors.role.message}
                  </Typography>
                )}
              </FormControl>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={() => setStep("account")}>
                  ← Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setStep("review")}
                  disabled={
                    !!errors.fullName ||
                    !!errors.email ||
                    !!errors.phone ||
                    !!errors.gender ||
                    !!errors.address ||
                    !!errors.state ||
                    !!errors.dob
                  }
                >
                  Next →
                </Button>
              </Box>
            </>
          )}

          {/* Step 3: Review & Submit */}
          {step === "review" && (
            <>
              <Typography variant="h6" gutterBottom>
                Review Your Details
              </Typography>
              <ul>
                <li>
                  <strong>Username:</strong> {watch("username")}
                </li>
                <li>
                  <strong>Full Name:</strong> {watch("fullName")}
                </li>
                <li>
                  <strong>Email:</strong> {watch("email")}
                </li>
                <li>
                  <strong>Phone:</strong> {watch("phone")}
                </li>
                <li>
                  <strong>Gender:</strong> {watch("gender")}
                </li>
                <li>
                  <strong>Address:</strong> {watch("address")}
                </li>
                <li>
                  <strong>State:</strong> {watch("state")}
                </li>
                <li>
                  <strong>Date of Birth:</strong> {watch("dob")}
                </li>
                <li>
                  <strong>Role:</strong> {watch("role")}
                </li>
              </ul>

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={() => setStep("personal")}>
                  ← Back
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </Box>
            </>
          )}
        </form>
      </Paper>

      {/* Snackbar for success/error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
