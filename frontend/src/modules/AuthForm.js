// AuthForm.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";

const AuthForm = ({ isLogin }) => {
  // Local state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    // You can add is_admin or other fields as needed
  });

  // Handle changes for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you’d call your API to either login or sign up
    // based on isLogin, sending formData to your backend.
    if (isLogin) {
      console.log("Logging in with:", formData);
    } else {
      console.log("Signing up with:", formData);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom color="text.primary">
        {isLogin ? "Login" : "Create Account"}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Show extra fields only if signing up */}
        {!isLogin && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date of Birth"
              variant="outlined"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              fullWidth
              margin="normal"
              label="Gender"
              variant="outlined"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </>
        )}

        {/* Common fields for both login and signup */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          fullWidth
          variant="contained"
          color="error" // red highlight
          sx={{ mt: 2 }}
          type="submit"
        >
          {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>OR</Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="outlined"
          color="primary" // black outline
          startIcon={<Google />}
          onClick={() => (window.location.href = "/auth/google")}
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          color="primary" // black outline
          startIcon={<Facebook />}
          onClick={() => (window.location.href = "/auth/facebook")}
        >
          Continue with Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default AuthForm;
