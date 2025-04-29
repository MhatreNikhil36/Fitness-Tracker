import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

const NavLink = styled(Link)(({ theme, active }) => ({
  display: "block",
  padding: "6px 16px",
  textDecoration: "none",
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  fontWeight: active ? 500 : 400,
  borderLeft: active ? `2px solid ${theme.palette.error.main}` : "none",
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { pathname } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { email });
      setSuccessMessage(
        "A password reset link has been sent to your email address. Please also check your spam folder."
      );
      setErrorMessage("");
      setEmail("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Unable to send password reset email. Please try again later.";
      setErrorMessage(msg);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item>
          <Box sx={{ width: 224 }}>
            <List sx={{ padding: 0 }}>
              <ListItem disablePadding>
                <NavLink
                  to="/forgot-password"
                  active={pathname === "/forgot-password" ? 1 : 0}
                >
                  <ListItemText
                    primary="Account"
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </NavLink>
              </ListItem>
            </List>
          </Box>
        </Grid>

        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Forgot Password
            </Typography>

            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success.main" variant="body2" sx={{ mb: 2 }}>
                {successMessage}
              </Typography>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
              />

              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                    width: 128,
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
