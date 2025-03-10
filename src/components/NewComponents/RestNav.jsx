import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  styled,
  Avatar,
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

const ProfileIcon = styled(Button)(({ theme }) => ({
  padding: "8px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
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

          {/* Center Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <Box sx={{ display: "flex", gap: 4 }}>
                <NavLink to="/Dash">Dashboard</NavLink>
                <NavLink to="/goals">Goals</NavLink>
                <NavLink to="/logactivity">Workout</NavLink>
                <NavLink to="/nutrition">Nutrition</NavLink>
              </Box>
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Profile Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ProfileIcon component={Link} to="/settings/profile">
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
