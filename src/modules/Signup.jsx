import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Info } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../api/config";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  styled,
  Alert,
} from "@mui/material";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  marginTop: "8px",
  backgroundColor: "black",
  color: "white",
  padding: "12px",
  textTransform: "uppercase",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "black",
    opacity: 0.75,
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  width: "100%",
  border: `1px solid ${theme.palette.divider}`,
  padding: "12px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const OrDivider = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: theme.spacing(3, 0),
}));

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    country: "us",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, birthdate, gender } =
      formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !birthdate ||
      !gender
    ) {
      return "All fields are required.";
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage("");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/users/signup`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        date_of_birth: formData.birthdate,
        gender: formData.gender,
        country: formData.country,
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthdate: "",
        gender: "",
        country: "us",
      });

      setErrorMessage("");
      setSuccessMessage("Signup successful! You can now log in.");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container
        maxWidth="sm"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Welcome to FIT TRACK
          </Typography>

          <Typography variant="body2" align="center" sx={{ mb: 4 }}>
            Already a member? <StyledLink to="/login">Log in</StyledLink>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <TextField
              id="firstName"
              label="First Name"
              fullWidth
              size="small"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              id="lastName"
              label="Last Name"
              fullWidth
              size="small"
              value={formData.lastName}
              onChange={handleChange}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              fullWidth
              size="small"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="birthdate"
              type="date"
              label="Birthdate"
              fullWidth
              size="small"
              value={formData.birthdate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth size="small">
              <InputLabel
                id="gender-label"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Gender
                <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                  <Info size={16} color="#9e9e9e" />
                </IconButton>
              </InputLabel>
              <Select
                name="gender"
                labelId="gender-label"
                id="gender"
                label="Gender"
                value={formData.gender}
                onChange={handleSelectChange}
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="country-label">Country/Region</InputLabel>
              <Select
                name="country"
                labelId="country-label"
                id="country"
                label="Country/Region"
                value={formData.country}
                onChange={handleSelectChange}
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="ca">Canada</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="au">Australia</MenuItem>
              </Select>
            </FormControl>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && (
              <Alert severity="success">
                {successMessage}{" "}
                <StyledLink to="/login" style={{ fontWeight: 500 }}>
                  Go to Login
                </StyledLink>
              </Alert>
            )}

            <SignupButton type="submit" fullWidth>
              Sign Up
            </SignupButton>

            <OrDivider>
              <Divider sx={{ width: "100%", position: "absolute" }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  px: 2,
                  bgcolor: "background.paper",
                  position: "relative",
                }}
              >
                Or sign up with
              </Typography>
            </OrDivider>

            <GoogleButton
              variant="outlined"
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#4285F4"
                    d="M21.805 10.023h-9.82v3.953h5.652c-.244 1.278-.988 2.36-2.104 3.088v2.57h3.412c1.999-1.84 3.158-4.552 3.158-7.61z"
                  />
                  <path
                    fill="#34A853"
                    d="M11.985 22c2.698 0 4.963-.898 6.618-2.437l-3.412-2.57c-.946.633-2.152 1.01-3.206 1.01-2.47 0-4.56-1.668-5.306-3.912H3.167v2.448A10.003 10.003 0 0 0 11.985 22z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.679 13.09a5.997 5.997 0 0 1 0-3.18V7.462H3.167a10.001 10.001 0 0 0 0 9.075l3.512-2.447z"
                  />
                  <path
                    fill="#EA4335"
                    d="M11.985 5.993c1.468 0 2.788.506 3.826 1.503l2.871-2.87C17.013 2.993 14.748 2 11.985 2A10.003 10.003 0 0 0 3.167 7.462l3.512 2.448c.746-2.244 2.836-3.917 5.306-3.917z"
                  />
                </svg>
              }
            >
              Sign up with Google
            </GoogleButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
