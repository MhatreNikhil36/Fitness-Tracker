// NavigationBar.js
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button component={Link} to="/Homepage" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/Dash" color="inherit">
          Dashboard
        </Button>
        <Button component={Link} to="/nutrition" color="inherit">
          Nutrition
        </Button>
        <Button component={Link} to="/goals" color="inherit">
          Goals
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
