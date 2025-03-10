// AddAiPromptPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';

const AddAiPromptPage = () => {
  const [formData, setFormData] = useState({
    type: '',
    prompt: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: POST /api/ai-prompts
    // In reality, you'd set user_id & generated_at on the backend
    console.log('Submitting AI prompt:', formData);
    // Reset form
    setFormData({ type: '', prompt: '', content: '' });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add AI Prompt
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Type (workout/nutrition/etc.)"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              required
            />
            <TextField
              label="Content (AI-generated details)"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              required
            />
            <Button type="submit" variant="contained" color="error" sx={{ mt: 2 }}>
              Save AI Prompt
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddAiPromptPage;
