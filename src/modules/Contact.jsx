import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import Footer from "../components/Footer";
import axios from "axios";
import { API_BASE_URL } from "../api/config";

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        name: (user.firstName || "") + " " + (user.lastName || ""),
        email: user.email || "",
        message: "",
      });
      setIsUserLoggedIn(true);
    } else {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setIsUserLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/contact`, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSuccessMessage("Your feedback is highly appreciated!");
      setErrorMessage("");
      setFormData({ name: formData.name, email: formData.email, message: "" });
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h3" color="text.primary" gutterBottom>
          Contact Us
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  Get In Touch
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Have questions or feedback? We'd love to hear from you. Fill
                  out the form below and we'll get back to you as soon as
                  possible.
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {successMessage && (
                  <Typography
                    color="success.main"
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    {successMessage}
                  </Typography>
                )}
                {errorMessage && (
                  <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Typography>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          readOnly: isUserLoggedIn,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          readOnly: isUserLoggedIn,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          bgcolor:
                            theme.palette.mode === "light"
                              ? "#d32f2f"
                              : "#f44336",
                          "&:hover": {
                            bgcolor:
                              theme.palette.mode === "light"
                                ? "#b71c1c"
                                : "#e53935",
                          },
                        }}
                      >
                        SEND MESSAGE
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="text.primary" gutterBottom>
                      Contact Information
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Email sx={{ color: "#d32f2f" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary="fittrack.wdm@gmail.com"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Phone sx={{ color: "#d32f2f" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone"
                          secondary="+1 (123) 456-7890"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocationOn sx={{ color: "#d32f2f" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Address"
                          secondary="UT Arlington, 701 S Nedderman Dr, Arlington, TX 76019"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" color="text.primary" gutterBottom>
                      Find Us
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Paper
                      elevation={0}
                      sx={{ height: 300, overflow: "hidden", borderRadius: 1 }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13425.362895477032!2d-97.1251708!3d32.730142199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d6dabc9564d%3A0x6c5cbeb084c8b76a!2sThe%20University%20of%20Texas%20at%20Arlington!5e0!3m2!1sen!2sus!4v1741659413110!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                      ></iframe>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Contact;
