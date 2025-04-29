import jwt from "jsonwebtoken";
import pool from "../lib/db.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with this email address." });
    }

    const user = users[0];

    if (!user.password_hash || user.password_hash === "") {
      return res.status(403).json({
        message:
          "This account was created using Google. Please log in using Google Sign-In.",
      });
    }

    if (password !== user.password_hash) {
      return res
        .status(401)
        .json({ message: "The password you entered is incorrect." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "3h" });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        heightCm: user.height_cm,
        weightKg: user.weight_kg,
        country: user.country,
        is_admin: user.is_admin,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const registerUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    date_of_birth,
    gender,
    height_cm,
    weight_kg,
    country,
  } = req.body;

  try {
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "This email is already associated with an existing account.",
      });
    }

    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, date_of_birth, gender, height_cm, weight_kg, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        password,
        date_of_birth,
        gender,
        height_cm,
        weight_kg,
        country,
      ]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const {
    first_name,
    last_name,
    date_of_birth,
    weight_kg,
    height_cm,
    gender,
    city,
    state,
    country,
  } = req.body;

  try {
    await pool.query(
      `UPDATE users SET
        first_name = ?, last_name = ?, date_of_birth = ?, weight_kg = ?, height_cm = ?,
        gender = ?, city = ?, state = ?, country = ?
      WHERE id = ?`,
      [
        first_name,
        last_name,
        date_of_birth,
        weight_kg,
        height_cm,
        gender,
        city,
        state,
        country,
        userId,
      ]
    );

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update your profile. Please try again." });
  }
};

export const updatePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Account not found." });
    }

    const user = rows[0];

    if (user.password_hash && currentPassword !== user.password_hash) {
      return res
        .status(401)
        .json({ message: "The current password you entered is incorrect." });
    }

    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      newPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update password. Please try again." });
  }
};

export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No account found with this email address." });
    }

    const user = users[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Password reset email sent successfully." });
  } catch (err) {
    res.status(500).json({
      message: "Unable to send password reset email. Please try again.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      newPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res
      .status(400)
      .json({ message: "The password reset link is invalid or has expired." });
  }
};

export const updateEmail = async (req, res) => {
  const userId = req.userId;
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, userId]
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: "This email is already in use by another account." });
    }

    await pool.query("UPDATE users SET email = ? WHERE id = ?", [
      email,
      userId,
    ]);

    res.json({ message: "Email updated successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update email. Please try again later." });
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.userId;

  try {
    await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete account. Please try again later." });
  }
};
