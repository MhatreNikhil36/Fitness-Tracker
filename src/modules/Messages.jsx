import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../api/config";
import SettingsSidebar from "../components/SettingsSidebar";

export default function Messages() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  /* ---------- helpers ---------- */
  const fetchMessages = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return; // user logged out
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(data);
      setErrorMsg("");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to load messages.";
      setErrorMsg(msg);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /* ---------- send new message ---------- */
  const handleSend = async () => {
    if (!body.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please log in first.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/messages`,
        { subject, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubject("");
      setBody("");
      setSuccessMsg("Message sent.");
      setErrorMsg("");
      fetchMessages();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to send message.";
      setErrorMsg(msg);
      setSuccessMsg("");
    }
  };

  /* ---------- JSX ---------- */
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item>
          <SettingsSidebar />
        </Grid>

        <Grid item xs>
          <Box sx={{ maxWidth: 600 }}>
            <Typography variant="h6" fontWeight={500} sx={{ mb: 4 }}>
              Support / Messages
            </Typography>

            {errorMsg && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMsg}
              </Typography>
            )}
            {successMsg && (
              <Typography color="success.main" sx={{ mb: 2 }}>
                {successMsg}
              </Typography>
            )}

            {/* compose */}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
            >
              <TextField
                label="Subject"
                size="small"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                label="Message*"
                multiline
                minRows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleSend}
                sx={{ width: 128, textTransform: "uppercase" }}
              >
                Send
              </Button>
            </Box>

            {/* history */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Previous messages
            </Typography>
            <List dense>
              {messages.map((m) => (
                <ListItem key={m.message_id} alignItems="flex-start">
                  <ListItemText
                    primary={m.subject || "(no subject)"}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {new Date(m.created_at).toLocaleString()}
                        </Typography>
                        {" — "}
                        {m.body}
                      </>
                    }
                  />
                </ListItem>
              ))}
              {messages.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No messages yet.
                </Typography>
              )}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
