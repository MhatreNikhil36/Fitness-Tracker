import jwt from "jsonwebtoken";
import pool from "../lib/db.js";

const JWT_SECRET = "secret123";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const user = users[0];

    if (password !== user.password_hash) {
      return res.status(401).json({ message: "Invalid credentials" });
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
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
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
      "SELECT id FROM Users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    await pool.query(
      `INSERT INTO Users (first_name, last_name, email, password_hash, date_of_birth, gender, height_cm, weight_kg, country)
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

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
      `UPDATE Users SET
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

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};
