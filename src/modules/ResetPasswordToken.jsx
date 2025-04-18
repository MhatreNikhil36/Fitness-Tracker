import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
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

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function ResetPasswordToken() {
  const { token } = useParams();
  const { pathname } = useLocation();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.newPassword || !form.confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/users/reset-password/${token}`, {
        newPassword: form.newPassword,
      });

      setSuccessMessage(
        "Password reset successful! You can now log in with your new password."
      );
      setForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to reset password.";
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
                  to="/reset-password/token"
                  active={pathname.includes("/reset-password") ? 1 : 0}
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
              Set New Password
            </Typography>

            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography color="success.main" variant="body2" sx={{ mb: 2 }}>
                {successMessage}{" "}
                <StyledLink to="/login">Go to Login</StyledLink>
              </Typography>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                fullWidth
                size="small"
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
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
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
