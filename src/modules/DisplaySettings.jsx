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
import SettingsSidebar from "../components/SettingsSidebar";

export default function DisplaySettings() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item>
          <SettingsSidebar />
        </Grid>

        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Display
            </Typography>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <FormControl fullWidth variant="outlined" size="small">
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

              <FormControl fullWidth variant="outlined" size="small">
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

              <Box sx={{ pt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    width: 128,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontWeight: 500,
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
