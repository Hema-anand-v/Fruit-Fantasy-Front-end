// UserProfileFormValidated.tsx
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    phone: "",
  });

  const [validation, setValidation] = useState({
    username: true,
    address: true,
    phone: true,
  });

  const isFormValid =
    validation.username && validation.address && validation.phone;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  // Validation logic
  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "username":
        setValidation({
          ...validation,
          username: value.trim() !== "" && value.length > 2,
        });
        break;
      case "address":
        setValidation({
          ...validation,
          address: value.trim() !== "" && value.length > 10,
        });
        break;
      case "phone":
        setValidation({
          ...validation,
          phone: /^[0-9]{10}$/.test(value),
        });
        break;
      default:
        break;
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isFormValid) return;
  
    try {
      // Assuming user ID is stored in localStorage at login
      const userId = localStorage.getItem("userId");
      console.log("User ID:", userId); 
  
      if (!userId) {
        alert("User not found. Please login again.");
        return;
      }
  
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
      alert(`${updatedUser.username}'s profile updated successfully!`);
      clearFormData();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the profile.");
    }
  };
  

  // Reset form
  const clearFormData = () => {
    setFormData({ username: "", address: "", phone: "" });
    setValidation({ username: true, address: true, phone: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "linear-gradient(135deg, #f0f4ff 0%, #e6f7f1 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Fill in the details
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={formData.username}
              onBlur={(e) => validateInput(e.target.name, e.target.value)}
              onChange={handleInputChange}
              error={!validation.username}
              helperText={
                !validation.username &&
                "Username is required and should be at least 3 characters"
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={formData.address}
              multiline
              rows={3}
              onBlur={(e) => validateInput(e.target.name, e.target.value)}
              onChange={handleInputChange}
              error={!validation.address}
              helperText={
                !validation.address && "Address is required and should be at least 10 characters"
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onBlur={(e) => validateInput(e.target.name, e.target.value)}
              onChange={handleInputChange}
              error={!validation.phone}
              helperText={
                !validation.phone && "Phone number must be 10 digits"
              }
            />

            {/* Submit + Reset buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={clearFormData}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  color: "#2F4F4F",
                  borderColor: "#2F4F4F",
                  "&:hover": { borderColor: "#1e3535", color: "#1e3535" },
                }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  bgcolor: "#2E7D32",
                  "&:hover": { bgcolor: "#256628" },
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

