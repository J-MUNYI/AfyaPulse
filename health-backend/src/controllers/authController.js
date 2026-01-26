import { query } from "../db.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { signToken } from "../utils/jwt.js";

export async function register(req, res) {
  const { emailOrPhone, password, name } = req.body;

  try {
    const existing = await query(
      "SELECT id FROM users WHERE email_or_phone = $1",
      [emailOrPhone]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await hashPassword(password);

    const result = await query(
      "INSERT INTO users (email_or_phone, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email_or_phone, name",
      [emailOrPhone, passwordHash, name]
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const { emailOrPhone, password } = req.body;

  try {
    const result = await query(
      "SELECT id, email_or_phone, password_hash, name FROM users WHERE email_or_phone = $1",
      [emailOrPhone]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken({ id: user.id });
    delete user.password_hash;

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}