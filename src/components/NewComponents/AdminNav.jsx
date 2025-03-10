import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

// Styled components
const FitLogo = styled(Typography)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  padding: "4px 8px",
  fontSize: "0.875rem",
}));

const TrackLogo = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.875rem",
  marginLeft: "4px",
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "black",
  fontWeight: 600,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
}));

export default function AdminNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, mb: 10, width: "100%" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <FitLogo variant="body2">FIT</FitLogo>
              <TrackLogo variant="body2">TRACK</TrackLogo>
            </Link>
          </Box>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Center Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <NavLink to="/admin">Dashboard</NavLink>
                <NavLink to="/admin/add-exercise">Add Exercise</NavLink>
                <NavLink to="/admin/add-workout">Add Workout</NavLink>
                <NavLink to="/admin/add-Ai">Add AI Prompt</NavLink>
              </Box>
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* No Auth Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            {/* You can add other buttons or links here if needed */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
