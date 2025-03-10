// NavigationBar.js
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// Create a styled navigation button that follows best practices
const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  margin: theme.spacing(1),
  textTransform: 'none',
  transition: theme.transitions.create(['color', 'transform', 'border-bottom'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'transparent', // keep the background unchanged
    color: theme.palette.error.main,  // text becomes red on hover
    transform: 'scale(1.05)',
    borderBottom: `2px solid ${theme.palette.error.main}`,
    fontWeight: 'bold',
  },
}));

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <NavButton component={Link} to="/Homepage">
          Home
        </NavButton>
        <NavButton component={Link} to="/Dash">
          Dashboard
        </NavButton>
        <NavButton component={Link} to="/nutrition">
          Nutrition
        </NavButton>
        <NavButton component={Link} to="/goals">
          Goals
        </NavButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
