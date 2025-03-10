import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import SettingsSidebar from "../NewComponents/Settings_Sidebar";

export default function AccountSettings() {
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
              Account
            </Typography>

            {/* Email Section */}
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
                    defaultValue="abc1234@mavs.uta.edu"
                  />
                </Box>
                <Button
                  variant="contained"
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

            {/* Password Reset Section */}
            <Box sx={{ mb: 6 }}>
              <MuiLink
                component={Link}
                to="/password-reset"
                underline="hover"
                sx={{ color: "text.primary" }}
              >
                Request Password Reset
              </MuiLink>
            </Box>

            {/* Delete Account Section */}
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
                component={Link}
                to="/delete-account"
                underline="hover"
                sx={{ color: "text.primary" }}
              >
                Delete Account
              </MuiLink>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
