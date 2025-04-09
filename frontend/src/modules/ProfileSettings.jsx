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
import SettingsSidebar from "../components/Settings_Sidebar";

export default function ProfileSettings() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left Sidebar */}
        <Grid item>
          <SettingsSidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs>
          <Paper sx={{ p: 3, maxWidth: 800 }}>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              Profile Information
            </Typography>

            {/* Profile Stats */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
              <Box sx={{ flexShrink: 0 }}>
                <Avatar sx={{ width: 96, height: 96, bgcolor: "grey.200" }}>
                  <User size={48} color="#9e9e9e" />
                </Avatar>
              </Box>
              <Grid container spacing={4} columns={12}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography fontWeight={500}>03/10/2025</Typography>
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

            {/* Profile Form */}
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name*"
                    defaultValue="John"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name*"
                    defaultValue="Doe"
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <TextField
                type="date"
                label="Birthdate*"
                fullWidth
                size="small"
                InputLabelProps={{ shrink: true }}
              />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Weight (lb)"
                    defaultValue="150"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Height (ft)"
                    defaultValue="6"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Height (in)"
                    defaultValue="0"
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth size="small">
                <InputLabel>Gender*</InputLabel>
                <Select defaultValue="male" label="Gender*">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    defaultValue="Arlington"
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    defaultValue="TX"
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>

              <FormControl fullWidth size="small">
                <InputLabel>Location</InputLabel>
                <Select defaultValue="us" label="Location">
                  <MenuItem value="us">United States</MenuItem>
                  <MenuItem value="ca">Canada</MenuItem>
                  <MenuItem value="uk">United Kingdom</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
