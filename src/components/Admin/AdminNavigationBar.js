// AdminNavigationBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminNavigationBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button component={Link} to="/admin" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/admin/add-exercise" color="inherit">
          Add Exercise
        </Button>
        <Button component={Link} to="/admin/add-workout" color="inherit">
          Add Workout
        </Button>
        <Button component={Link} to="/admin/add-Ai" color="inherit">
          Add AI Prompt
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavigationBar;
