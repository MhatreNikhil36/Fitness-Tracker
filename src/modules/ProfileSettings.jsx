import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { User } from "lucide-react";
import SettingsSidebar from "../components/SettingsSidebar";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

export default function ProfileSettings() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    weight_kg: "",
    height_cm: "",
    gender: "male",
    city: "",
    state: "",
    country: "us",
    created_at: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const rawUser = res.data.user;

        const formattedDate = rawUser.date_of_birth
          ? rawUser.date_of_birth.split("T")[0]
          : "";

        setUserData({
          ...rawUser,
          date_of_birth: formattedDate,
        });
      } catch (err) {
        setErrorMessage("Failed to load profile data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/api/users/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Profile updated successfully.");
      setErrorMessage("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile.";
      setErrorMessage(msg);
      setSuccessMessage("");
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
              Profile Information
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
              <Avatar sx={{ width: 96, height: 96, bgcolor: "grey.200" }}>
                <User size={48} color="#9e9e9e" />
              </Avatar>
              <Grid container spacing={4}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography fontWeight={500}>
                    {userData.created_at
                      ? new Date(userData.created_at).toLocaleDateString()
                      : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Friends
                  </Typography>
                  <Typography fontWeight={500}>0</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    All Time Distance
                  </Typography>
                  <Typography fontWeight={500}>0 mi</Typography>
                </Grid>
              </Grid>
            </Box>

            {errorMessage && (
              <Box sx={{ mb: 2 }}>
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              </Box>
            )}
            {successMessage && (
              <Box sx={{ mb: 2 }}>
                <Typography color="success.main" variant="body2">
                  {successMessage}
                </Typography>
              </Box>
            )}

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name*"
                    name="first_name"
                    value={userData.first_name}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name*"
                    name="last_name"
                    value={userData.last_name}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <TextField
                name="date_of_birth"
                type="date"
                label="Birthdate*"
                value={userData.date_of_birth || ""}
                fullWidth
                size="small"
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Weight (kg)"
                    name="weight_kg"
                    value={userData.weight_kg || ""}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Height (cm)"
                    name="height_cm"
                    value={userData.height_cm || ""}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth size="small">
                <InputLabel>Gender*</InputLabel>
                <Select
                  name="gender"
                  value={userData.gender}
                  label="Gender*"
                  onChange={handleChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={userData.city || ""}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={userData.state || ""}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth size="small">
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={userData.country}
                  label="Country"
                  onChange={handleChange}
                >
                  <MenuItem value="us">United States</MenuItem>
                  <MenuItem value="ca">Canada</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
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
