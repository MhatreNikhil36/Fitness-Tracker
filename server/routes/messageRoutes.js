import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createMessage,
  getMessagesForUser,
  updateMessage,
  deleteMessage,
  listAllMessages,
  replyToMessage,
} from "../controllers/messageController.js";

const router = express.Router();

/* ---------- user routes ---------- */
router.post("/",      verifyToken, createMessage);
router.get("/",       verifyToken, getMessagesForUser);
router.put("/",       verifyToken, updateMessage);
router.delete("/:messageId", verifyToken, deleteMessage);

/* ---------- admin routes ---------- */
/* Keep /all BEFORE the :messageId param route */
router.get("/all",                verifyToken, listAllMessages);
router.post("/:messageId/reply",  verifyToken, replyToMessage);
router.put("/reply",        verifyToken, replyToMessage)

export default router;
