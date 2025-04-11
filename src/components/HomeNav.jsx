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
} from "@mui/material";
import { Link } from "react-router-dom";

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

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#111",
  padding: "12px 28px",
  textTransform: "uppercase",
  fontSize: "0.875rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  backgroundColor: "black",
  color: "white",
  padding: "8px 24px",
  textTransform: "uppercase",
  fontSize: "0.875rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#333",
  },
}));

export default function HomeNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, mb: 2 }}>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              flex: 1,
            }}
          >
            <LoginButton component={Link} to="/login" variant="text">
              Log In
            </LoginButton>
            <SignupButton
              component={Link}
              to="/signup"
              variant="contained"
              disableElevation
            >
              Sign Up
            </SignupButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
