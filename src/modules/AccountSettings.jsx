import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SettingsSidebar from "../components/SettingsSidebar";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(res.data.user.email);
        setOriginalEmail(res.data.user.email);
      } catch (err) {
        setErrorMessage(
          "Unable to retrieve your account information. Please try again later."
        );
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (email === originalEmail) {
      setSuccessMessage("No changes detected.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/users/email`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOriginalEmail(email);
      setSuccessMessage("Your email address has been updated successfully.");
      setErrorMessage("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Unable to update your email address. Please try again.";
      setErrorMessage(msg);
      setSuccessMessage("");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/users/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/signup");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Unable to delete your account. Please try again later."
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item>
          <SettingsSidebar />
        </Grid>

        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Account
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

            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Email
                    <Box component="span" sx={{ color: "error.main" }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    bgcolor: "grey.200",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "grey.300",
                    },
                    width: 96,
                    mt: 3,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <MuiLink
                component={Link}
                to="/settings/reset-password"
                underline="hover"
                sx={{ color: "text.primary" }}
              >
                Request Password Reset
              </MuiLink>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={500} sx={{ mb: 2 }}>
                Delete Account
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, maxWidth: "90%", lineHeight: 1.6 }}
              >
                Deleting your account is instant and permanent. You will not be
                able to regain access to your account or your fitness data.
                Please make sure you are ready to permanently delete before
                proceeding.
              </Typography>
              <MuiLink
                component="button"
                underline="hover"
                sx={{ color: "text.primary" }}
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete Account
              </MuiLink>
            </Box>

            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            >
              <DialogTitle>Delete Account</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to permanently delete your account? This
                  action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  color="error"
                  variant="contained"
                >
                  Confirm Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
