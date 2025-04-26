import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

const AddAiPromptPage = () => {
  const [formData, setFormData] = useState({
    prompt_type: "",
    prompt_template: "",
    variables: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const payload = {
        prompt_type: formData.prompt_type,
        prompt_template: formData.prompt_template,
        variables: formData.variables
          ? formData.variables.split(",").map((v) => v.trim())
          : [],
      };

      await axios.post(`${API_BASE_URL}/api/aiprompts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage("AI Prompt created successfully.");
      setErrorMessage("");
      setFormData({
        prompt_type: "",
        prompt_template: "",
        variables: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message || "Failed to save AI prompt."
      );
      setSuccessMessage("");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add AI Prompt
          </Typography>

          {errorMessage && (
            <Typography variant="body2" sx={{ color: "error.main", mb: 2 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body2" sx={{ color: "success.main", mb: 2 }}>
              {successMessage}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Prompt Type (e.g., workout, nutrition)"
              name="prompt_type"
              value={formData.prompt_type}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Prompt Template"
              name="prompt_template"
              value={formData.prompt_template}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              required
            />
            <TextField
              label="Variables (comma-separated)"
              name="variables"
              value={formData.variables}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
            >
              Save AI Prompt
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddAiPromptPage;
