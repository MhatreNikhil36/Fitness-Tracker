// src/pages/AdminMessagesPage.js
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch all messages
  const loadAll = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/messages/all`,
        { headers }
      );
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  // Mark as read & select
  const handleSelect = async (m) => {
    setSelected(m);
    setReply(m.admin_reply || "");
    try {
      await axios.put(
        `${API_URL}/api/messages`,
        { message_id: m.message_id, is_read: true },
        { headers }
      );
      setMessages((msgs) =>
        msgs.map(x =>
          x.message_id === m.message_id ? { ...x, is_read: true } : x
        )
      );
    } catch (err) {
      console.error("Could not mark read:", err);
    }
  };

  // Send reply
  const handleSendReply = async () => {
    if (!reply.trim() || !selected) return;

    try {
      // POST to reply endpoint with URL param
      await axios.post(
        `${API_URL}/api/messages/${selected.message_id}/reply`,
        { body: reply.trim() },
        { headers }
      );
      setReply("");
      setSelected(null);
      loadAll();
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Messages
      </Typography>
      <Grid container spacing={4}>
        {/* List */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined">
            <List dense>
              {messages.map((m) => (
                <Box key={m.message_id}>
                  <ListItemButton
                    selected={selected?.message_id === m.message_id}
                    onClick={() => handleSelect(m)}
                  >
                    <ListItemText
                      primary={m.subject || "(no subject)"}
                      secondary={
                        <>
                          {m.email} —{" "}
                          {new Date(m.created_at).toLocaleDateString()}
                        </>
                      }
                    />
                  </ListItemButton>
                  <Divider />
                </Box>
              ))}
              {messages.length === 0 && (
                <Typography variant="body2" sx={{ p: 2 }}>
                  No messages.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Detail / Reply */}
        <Grid item xs={12} md={8}>
          {selected ? (
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selected.subject || "(no subject)"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                From: {selected.email} <br />
                Sent: {new Date(selected.created_at).toLocaleString()}
              </Typography>
              <Typography sx={{ whiteSpace: "pre-wrap", mb: 3 }}>
                {selected.body}
              </Typography>

              <TextField
                label="Reply"
                multiline
                minRows={4}
                fullWidth
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSendReply}
              >
                Send Reply &amp; Close
              </Button>
            </Paper>
          ) : (
            <Typography variant="body1" sx={{ mt: 4 }}>
              Select a message to view and reply.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
