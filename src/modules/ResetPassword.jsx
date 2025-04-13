import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SettingsSidebar from "../components/Settings_Sidebar";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

export default function ResetPassword() {
  const [form, setForm] = useState({
    currentPassword: "",
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

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/users/password`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage("Password updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update password.";
      setErrorMessage(msg);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Sidebar */}
        <Grid item>
          <SettingsSidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Reset Password
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
                label="Current Password"
                name="currentPassword"
                type="password"
                value={form.currentPassword}
                onChange={handleChange}
                fullWidth
                size="small"
              />

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
                label="Confirm New Password"
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
