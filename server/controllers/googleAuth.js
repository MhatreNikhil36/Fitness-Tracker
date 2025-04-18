import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import pool from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
          email,
        ]);

        if (users.length === 0) {
          const nameParts = profile.displayName.split(" ");
          const first_name = nameParts[0];
          const last_name = nameParts.slice(1).join(" ");

          await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash)
             VALUES (?, ?, ?, '')`,
            [first_name, last_name, email]
          );

          [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
          ]);
        }

        const user = users[0];
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
          expiresIn: "3h",
        });

        return done(null, { token, user });
      } catch (err) {
        console.error("Google Auth Error:", err);
        return done(err, null);
      }
    }
  )
);
