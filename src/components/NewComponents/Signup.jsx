import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Info } from "lucide-react";

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
} from "@mui/material";

// Styled components
const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBirthdateChange = (e) => {
    const dateValue = e.target.value;
    const dateParts = dateValue.split("-");
    if (dateParts.length === 3 && dateParts[0].length > 4) {
      e.target.value = dateValue.slice(0, -1); // Prevent adding more than four digits
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                id="firstName"
                label="First Name"
                placeholder="Enter First Name"
                fullWidth
                variant="outlined"
                size="small"
              />

              <TextField
                id="lastName"
                label="Last Name"
                placeholder="Enter Last Name"
                fullWidth
                variant="outlined"
                size="small"
              />

              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter Email"
                fullWidth
                variant="outlined"
                size="small"
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Adjusted Birthdate Field */}
              <TextField
                id="birthdate"
                type="date"
                label="Birthdate"
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleBirthdateChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label doesn't overlap the input
                }}
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
                  labelId="gender-label"
                  id="gender"
                  label="Gender"
                  defaultValue=""
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
                  labelId="country-label"
                  id="country"
                  label="Country/Region"
                  defaultValue="us"
                >
                  <MenuItem value="us">United States</MenuItem>
                  <MenuItem value="ca">Canada</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                  <MenuItem value="au">Australia</MenuItem>
                </Select>
              </FormControl>

              <SignupButton
                variant="contained"
                fullWidth
                disableElevation
                sx={{ mt: 1 }}
              >
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
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path
                        fill="#4285F4"
                        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                      />
                      <path
                        fill="#EA4335"
                        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                      />
                    </g>
                  </svg>
                }
              >
                Sign up with Google
              </GoogleButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
