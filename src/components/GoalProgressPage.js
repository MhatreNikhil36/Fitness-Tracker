
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';

const GoalProgressPage = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();

  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newProgress, setNewProgress] = useState({
    recorded_value: '',
    timestamp: '',
  });

  useEffect(() => {
    // ------------------------------------------------------
    // MOCK API CALL: In a real scenario, fetch the goal by ID:
    // fetch(`/api/goals/${goalId}`)
    //   .then(res => res.json())
    //   .then(data => setGoalData(data))
    //   .catch(err => console.error(err))
    // ------------------------------------------------------
    setTimeout(() => {
      // Example goal with existing progress
      const mockGoal = {
        id: Number(goalId),
        goal_type: 'lose_weight',
        target_value: 70,
        current_value: 75,
        status: 'in_progress',
        deadline: '2025-12-31',
        progress: [
          { recorded_value: 78, timestamp: '2025-05-01' },
          { recorded_value: 76, timestamp: '2025-06-01' },
          { recorded_value: 75, timestamp: '2025-07-01' },
        ],
      };
      setGoalData(mockGoal);
      setLoading(false);
    }, 800);
  }, [goalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgress = (e) => {
    e.preventDefault();
    // ------------------------------------------------------
    // POST the new progress entry to your backend:
    // fetch(`/api/goals/${goalId}/progress`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newProgress)
    // })
    //   .then(res => res.json())
    //   .then(updatedGoal => setGoalData(updatedGoal))
    //   .catch(err => console.error(err));
    // ------------------------------------------------------
    console.log('Submitting new progress:', newProgress);

    // Mocking an update to the local state:
    setGoalData((prev) => ({
      ...prev,
      progress: [
        ...prev.progress,
        {
          recorded_value: Number(newProgress.recorded_value),
          timestamp: newProgress.timestamp,
        },
      ],
    }));

    // Reset the form
    setNewProgress({ recorded_value: '', timestamp: '' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!goalData) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 2 }}>
        <Typography variant="h5" color="text.primary">
          Goal not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Goal Progress (Goal ID: {goalData.id})
      </Typography>

      {/* Display chart of existing progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Current Progress
          </Typography>
          {goalData.progress && goalData.progress.length > 0 ? (
            <Box sx={{ mt: 2, width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={formatProgressData(goalData.progress)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="recorded_value"
                    stroke="#d32f2f"
                    strokeWidth={2}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          ) : (
            <Typography>No progress data available.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Form to add new progress */}
      {goalData.status === 'in_progress' && (
      <Card>
        <CardContent>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Add Progress
          </Typography>
          <form onSubmit={handleAddProgress}>
            <TextField
              fullWidth
              margin="normal"
              label="Recorded Value"
              type="number"
              name="recorded_value"
              value={newProgress.recorded_value}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Timestamp"
              type="date"
              name="timestamp"
              value={newProgress.timestamp}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button variant="contained" color="error" type="submit">
                Save Progress
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card> )}

      {/* Optionally a back button */}
      <Box sx={{ textAlign: 'left', mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/goals')}>
          Back to Goals
        </Button>
      </Box>
    </Box>
  );
};

function formatProgressData(progressArray) {
  return progressArray.map((p) => ({
    recorded_value: p.recorded_value,
    label: p.timestamp,
  }));
}

export default GoalProgressPage;
