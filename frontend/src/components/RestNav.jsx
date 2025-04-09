import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
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

const ProfileIcon = styled(Box)(({ theme }) => ({
  padding: "8px",
}));

export default function RestNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, mb: 10 }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
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

          {/* Center Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <StyledNavLink to="/dash">Dashboard</StyledNavLink>
                <StyledNavLink to="/goals">Goals</StyledNavLink>
                <StyledNavLink to="/logactivity">Workout</StyledNavLink>
                <StyledNavLink to="/nutrition">Nutrition</StyledNavLink>
              </Box>
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Profile Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ProfileIcon component={NavLink} to="/settings/profile">
              <Avatar
                sx={{ width: 32, height: 32 }}
                src="/static/images/avatar/1.jpg"
              />
            </ProfileIcon>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
