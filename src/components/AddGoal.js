import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Divider,
} from '@mui/material';

const GoalsPage = () => {
  // Local state matching the schema (minus id/user_id)
  const [goalData, setGoalData] = useState({
    goal_type: '',
    target_value: '',
    current_value: '',
    status: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --------------------------------------------------
    // EXAMPLE API CALL TO CREATE OR UPDATE GOAL
    // The backend will handle:
    //  - Generating 'id' (UUID)
    //  - Linking 'user_id' from auth context
    //  - Validating & saving the record
    //
    // fetch('/api/goals', {
    //   method: 'POST',  // or 'PUT' if updating
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(goalData),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('Goal saved:', data);
    //   })
    //   .catch(err => console.error(err));
    // --------------------------------------------------
    console.log('Submitted goal:', goalData);

    // Optionally reset form
    // setGoalData({ goal_type: '', target_value: '', current_value: '', status: '', deadline: '' });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Set or Update Your Goal
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Goal Type: preset dropdown options */}
            <TextField
              select
              fullWidth
              margin="normal"
              label="Goal Type"
              name="goal_type"
              value={goalData.goal_type}
              onChange={handleChange}
            >
              <MenuItem value="">Select a goal type</MenuItem>
              <MenuItem value="lose_weight">Lose Weight</MenuItem>
              <MenuItem value="gain_muscle">Gain Muscle</MenuItem>
              <MenuItem value="add_weight">Add Weight</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Target Value"
              name="target_value"
              value={goalData.target_value}
              onChange={handleChange}
              placeholder="e.g., 70 (kg) or 100 (reps)"
            />

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Current Value"
              name="current_value"
              value={goalData.current_value}
              onChange={handleChange}
              placeholder="e.g., 75 (kg) or 80 (reps)"
            />

            {/* Status dropdown (in_progress / completed) */}
            <TextField
              select
              fullWidth
              margin="normal"
              label="Status"
              name="status"
              value={goalData.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select a status</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>

            <TextField
              fullWidth
              margin="normal"
              label="Deadline"
              type="date"
              name="deadline"
              value={goalData.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <Divider sx={{ my: 2 }} />

            <Button variant="contained" color="error" type="submit" fullWidth>
              Save Goal
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GoalsPage;
