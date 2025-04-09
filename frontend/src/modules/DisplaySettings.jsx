import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  Grid,
} from "@mui/material";
import SettingsSidebar from "../components/Settings_Sidebar";

export default function DisplaySettings() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Left Sidebar */}
        <Grid item>
          <SettingsSidebar />
        </Grid>

        {/* Main Content */}
        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Display
            </Typography>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* Measurement Units */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Measurement Units</InputLabel>
                <Select defaultValue="metric" label="Measurement Units">
                  <MenuItem value="metric">
                    Metric (kg / km / kcal / C°)
                  </MenuItem>
                  <MenuItem value="imperial">
                    Imperial (lb / mi / cal / F°)
                  </MenuItem>
                </Select>
              </FormControl>

              {/* Time Zone */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>Time Zone</InputLabel>
                <Select defaultValue="America/Chicago" label="Time Zone">
                  <MenuItem value="America/Chicago">America/Chicago</MenuItem>
                  <MenuItem value="America/New_York">America/New_York</MenuItem>
                  <MenuItem value="America/Los_Angeles">
                    America/Los_Angeles
                  </MenuItem>
                  <MenuItem value="America/Denver">America/Denver</MenuItem>
                </Select>
              </FormControl>

              {/* Save Button */}
              <Box sx={{ pt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    py: 1.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    "&:hover": {
                      bgcolor: "#333",
                    },
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
