import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        py: 6,
        px: 4,
        minHeight: "100px",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="black">
              Help
            </Typography>
            <Typography variant="body2">
              <Link to="/contact">Contact Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="black">
              About
            </Typography>
            <Typography variant="body2">
              <Link to="/about">About Us</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="black">
              Connect
            </Typography>
            <Typography variant="body2">
              <Link to="#">Facebook</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
