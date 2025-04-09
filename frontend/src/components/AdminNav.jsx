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
import { NavLink } from "react-router-dom";

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

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: "black",
  fontWeight: 600,
  textDecoration: "none",
  position: "relative",
  paddingBottom: "12px",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "3px",
    bottom: "-6px",
    left: "0",
    backgroundColor: "#dc0019",
    transform: "scaleX(0)",
    transformOrigin: "center",
    transition: "transform 0.3s ease-out",
  },
  "&.active::after": {
    transform: "scaleX(1)",
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
            <NavLink
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <FitLogo variant="body2">FIT</FitLogo>
              <TrackLogo variant="body2">TRACK</TrackLogo>
            </NavLink>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Center Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                {/* Add `end` prop to ensure exact matching */}
                <StyledNavLink to="/admin" end>
                  Dashboard
                </StyledNavLink>
                <StyledNavLink to="/admin/add-exercise">
                  Add Exercise
                </StyledNavLink>
                <StyledNavLink to="/admin/add-workout">
                  Add Workout
                </StyledNavLink>
                <StyledNavLink to="/admin/add-Ai">Add AI Prompt</StyledNavLink>
              </Box>
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* No Auth Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          ></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
