import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import SettingsSidebar from "../components/SettingsSidebar";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

export default function ResetPassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (
          !res.data.user.password_hash ||
          res.data.user.password_hash === ""
        ) {
          setIsGoogleUser(true);
        } else {
          setIsGoogleUser(false);
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const togglePasswordVisibility = (field) => {
    if (field === "new-confirm") {
      setShowPassword((prev) => ({
        ...prev,
        new: !prev.new,
        confirm: !prev.new,
      }));
    } else {
      setShowPassword((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    }
  };

  const validatePassword = (password) => {
    if (password.length < 5)
      return "Password must be at least 5 characters long.";
    if (!/[A-Za-z]/.test(password))
      return "Password must include at least one letter.";
    if (!/[0-9]/.test(password))
      return "Password must include at least one number.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Password must include at least one special character.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const passwordError = validatePassword(form.newPassword);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setErrorMessage(
        "The new passwords you entered do not match. Please try again."
      );
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

      setSuccessMessage("Your password has been updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Unable to update your password. Please try again later.";
      setErrorMessage(msg);
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
              Reset Password
            </Typography>

            {isGoogleUser ? (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                This account was created with Google Sign-In. You do not need to
                set or change a password.
              </Typography>
            ) : (
              <>
                {errorMessage && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}
                {successMessage && (
                  <Typography
                    color="success.main"
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    {successMessage}
                  </Typography>
                )}
              </>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <TextField
                label="Current Password"
                name="currentPassword"
                type={showPassword.current ? "text" : "password"}
                value={form.currentPassword}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={isGoogleUser}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("current")}
                        edge="end"
                      >
                        {showPassword.current ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="New Password"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={isGoogleUser}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new-confirm")}
                        edge="end"
                      >
                        {showPassword.new ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={isGoogleUser}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility("new-confirm")}
                        edge="end"
                      >
                        {showPassword.confirm ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isGoogleUser}
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
