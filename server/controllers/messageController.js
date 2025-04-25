// controllers/messageController.js
import pool from "../lib/db.js";

/* ------------------------------------------------------------------ */
/*  helpers                                                           */
/* ------------------------------------------------------------------ */

async function isAdmin(userId) {
  if (!userId) return false;
  const [[row]] = await pool.query(
    "SELECT is_admin FROM users WHERE id = ?",
    [userId]
  );
  return !!row?.is_admin;
}

async function loadMessage(messageId) {
  const [[msg]] = await pool.query(
    "SELECT * FROM messages WHERE message_id = ?",
    [messageId]
  );
  if (!msg) throw Object.assign(new Error("Message not found"), { status: 404 });
  return msg;
}

/* ------------------------------------------------------------------ */
/*  user endpoints                                                    */
/* ------------------------------------------------------------------ */

export const createMessage = async (req, res) => {
  const { subject = null, body } = req.body;
  const userId = req.userId;

  if (!body?.trim()) {
    return res.status(400).json({ message: "Message body is required" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO messages (user_id, subject, body)
       VALUES (?, ?, ?)`,
      [userId, subject, body.trim()]
    );
    const [[created]] = await pool.query(
      "SELECT * FROM messages WHERE message_id = ?",
      [result.insertId]
    );
    res.status(201).json(created);
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesForUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT *
         FROM messages
        WHERE user_id = ?
        ORDER BY created_at DESC`,
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMessage = async (req, res) => {
  const { message_id, status, is_read } = req.body;
  if (!message_id) {
    return res.status(400).json({ message: "message_id is required" });
  }

  try {
    const [result] = await pool.query(
      `UPDATE messages
         SET status  = COALESCE(?, status),
             is_read = COALESCE(?, is_read)
       WHERE message_id = ? AND user_id = ?`,
      [status, is_read, message_id, req.userId]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Message not found or unauthorized" });
    }
    res.json({ message: "Message updated successfully" });
  } catch (err) {
    console.error("Error updating message:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const [owned] = await pool.query(
      "SELECT message_id FROM messages WHERE message_id = ? AND user_id = ?",
      [messageId, req.userId]
    );
    if (owned.length === 0) {
      return res
        .status(404)
        .json({ message: "Message not found or unauthorized" });
    }
    await pool.query(
      "DELETE FROM messages WHERE message_id = ?",
      [messageId]
    );
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ------------------------------------------------------------------ */
/*  admin‑only endpoints                                              */
/* ------------------------------------------------------------------ */

export const listAllMessages = async (req, res) => {
  if (!(await isAdmin(req.userId))) {
    return res.status(403).json({ message: "Admin access required" });
  }
  try {
    const [rows] = await pool.query(
      `SELECT m.*, u.email
         FROM messages m
         JOIN users u ON u.id = m.user_id
        ORDER BY m.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching all messages:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const replyToMessage = async (req, res) => {
  // Admin check
  if (!(await isAdmin(req.userId))) {
    return res.status(403).json({ message: "Admin access required" });
  }

  // accept either URL‐param POST or body‐based PUT
  let messageId = req.params.messageId;
  let replyBody = req.body.body;
  if (!messageId && req.body.message_id) {
    messageId = req.body.message_id;
  }
  if (!replyBody && req.body.admin_reply) {
    replyBody = req.body.admin_reply;
  }

  if (!replyBody?.trim()) {
    return res.status(400).json({ message: "Reply body is required" });
  }

  try {
    const original = await loadMessage(messageId);

    // Insert reply
    const replySubject = `RE: ${original.subject ?? "(no subject)"}`;
    await pool.query(
      `INSERT INTO messages (user_id, subject, body, status, is_read)
       VALUES (?, ?, ?, 'closed', FALSE)`,
      [original.user_id, replySubject, replyBody.trim()]
    );

    // Close & mark the original ticket read
    await pool.query(
      `UPDATE messages
         SET status  = 'closed',
             is_read = TRUE
       WHERE message_id = ?`,
      [messageId]
    );

    res.status(201).json({ message: "Reply sent" });
  } catch (err) {
    const status = err.status ?? 500;
    console.error("Error replying to message:", err);
    res.status(status).json({ message: err.message ?? "Server error" });
  }
};
