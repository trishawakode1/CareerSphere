import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { mkdir } from "node:fs/promises";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "replace-this-secret-in-production";
const SQLITE_PATH =
  process.env.SQLITE_PATH || path.resolve(process.cwd(), "data", "careersphere.db");
let db;

const configuredClientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const allowAnyLocalhostOrigin = process.env.ALLOW_ANY_LOCALHOST_ORIGIN !== "false";

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (origin === configuredClientOrigin) {
        callback(null, true);
        return;
      }

      if (allowAnyLocalhostOrigin) {
        const isLocalhost = /^http:\/\/localhost:\d+$/i.test(origin);
        if (isLocalhost) {
          callback(null, true);
          return;
        }
      }

      callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  }),
);
app.use(express.json());

const signToken = (user) =>
  jwt.sign(
    {
      sub: String(user.id),
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "2h" },
  );

const sanitizeUser = (user) => ({
  id: String(user.id),
  username: user.username,
  role: user.role,
});

const normalizeInterests = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

const sanitizeProfile = (profileRow, fallbackUsername = "") => ({
  name: profileRow?.name || fallbackUsername || "",
  username: profileRow?.username || fallbackUsername || "",
  email: profileRow?.email || "",
  phone: profileRow?.phone || "",
  age: profileRow?.age || "",
  location: profileRow?.location || "",
  degree: profileRow?.degree || "",
  major: profileRow?.major || "",
  institution: profileRow?.institution || "",
  graduationYear: profileRow?.graduation_year || "",
  currentRole: profileRow?.current_role || "",
  experience: profileRow?.experience || "",
  bio: profileRow?.bio || "",
  careerGoal: profileRow?.career_goal || "",
  interests: normalizeInterests(profileRow?.interests),
  linkedin: profileRow?.linkedin || "",
  portfolio: profileRow?.portfolio || "",
  photo: profileRow?.photo || null,
});

const upsertUserProfile = async (userId, username, profilePayload) => {
  const profile = sanitizeProfile(profilePayload, username);
  await db.run(
    `
      INSERT INTO user_profiles (
        user_id, name, username, email, phone, age, location, degree, major, institution,
        graduation_year, current_role, experience, bio, career_goal, interests, linkedin, portfolio, photo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        name = excluded.name,
        username = excluded.username,
        email = excluded.email,
        phone = excluded.phone,
        age = excluded.age,
        location = excluded.location,
        degree = excluded.degree,
        major = excluded.major,
        institution = excluded.institution,
        graduation_year = excluded.graduation_year,
        current_role = excluded.current_role,
        experience = excluded.experience,
        bio = excluded.bio,
        career_goal = excluded.career_goal,
        interests = excluded.interests,
        linkedin = excluded.linkedin,
        portfolio = excluded.portfolio,
        photo = excluded.photo
    `,
    userId,
    profile.name,
    profile.username || username,
    profile.email,
    profile.phone,
    profile.age,
    profile.location,
    profile.degree,
    profile.major,
    profile.institution,
    profile.graduationYear,
    profile.currentRole,
    profile.experience,
    profile.bio,
    profile.careerGoal,
    JSON.stringify(profile.interests || []),
    profile.linkedin,
    profile.portfolio,
    profile.photo,
  );
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedUsername = String(username).trim().toLowerCase();
    const existingUser = await db.get(
      "SELECT id FROM users WHERE username = ?",
      normalizedUsername,
    );
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insertResult = await db.run(
      "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
      normalizedUsername,
      passwordHash,
      "student",
    );
    const newUser = await db.get(
      "SELECT id, username, role FROM users WHERE id = ?",
      insertResult.lastID,
    );
    await upsertUserProfile(newUser.id, newUser.username, {
      name: newUser.username,
      username: newUser.username,
    });

    const token = signToken(newUser);
    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    return res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const normalizedUsername = String(username).trim().toLowerCase();
    const user = await db.get(
      "SELECT id, username, password_hash, role FROM users WHERE username = ?",
      normalizedUsername,
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const getuser = await db.get(
      "SELECT name FROM user_profiles WHERE username = ?",
      normalizedUsername,
    );
    if (!getuser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);
    return res.json({
      message: "Logged in successfully",
      token,
      user: sanitizeUser(user),
    });
  } catch {
    return res.status(500).json({ message: "Login failed" });
  }
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await db.get(
      "SELECT id, username, role FROM users WHERE id = ?",
      req.user.sub,
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user: sanitizeUser(user) });
  } catch {
    return res.status(500).json({ message: "Failed to fetch user" });
  }
});

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await db.get(
      "SELECT id, username FROM users WHERE id = ?",
      req.user.sub,
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileRow = await db.get(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      user.id,
    );

    if (!profileRow) {
      await upsertUserProfile(user.id, user.username, {
        name: user.username,
        username: user.username,
      });
      const insertedRow = await db.get(
        "SELECT * FROM user_profiles WHERE user_id = ?",
        user.id,
      );
      return res.json({ profile: sanitizeProfile(insertedRow, user.username) });
    }

    return res.json({ profile: sanitizeProfile(profileRow, user.username) });
  } catch {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
});

app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await db.get(
      "SELECT id, username FROM users WHERE id = ?",
      req.user.sub,
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await upsertUserProfile(user.id, user.username, req.body ?? {});
    const updatedProfile = await db.get(
      "SELECT * FROM user_profiles WHERE user_id = ?",
      user.id,
    );
    return res.json({
      message: "Profile updated successfully",
      profile: sanitizeProfile(updatedProfile, user.username),
    });
  } catch (error) {
    console.error("Failed to update profile", error);
    return res.status(500).json({ message: "Failed to update profile" });
  }
});

app.post("/api/auth/logout", (_req, res) => {
  return res.json({ message: "Logged out successfully" });
});

const seedDemoUser = async () => {
  const existingDemoUser = await db.get(
    "SELECT id FROM users WHERE username = ?",
    "demo",
  );
  if (existingDemoUser) {
    return;
  }

  const passwordHash = await bcrypt.hash("demo1234", 10);
  await db.run(
    "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
    "demo",
    passwordHash,
    "student",
  );
};

const initDb = async () => {
  const dbDirectory = path.dirname(SQLITE_PATH);
  await mkdir(dbDirectory, { recursive: true });

  db = await open({
    filename: SQLITE_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student'
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INTEGER PRIMARY KEY,
      name TEXT,
      username TEXT,
      email TEXT,
      phone TEXT,
      age TEXT,
      location TEXT,
      degree TEXT,
      major TEXT,
      institution TEXT,
      graduation_year TEXT,
      current_role TEXT,
      experience TEXT,
      bio TEXT,
      career_goal TEXT,
      interests TEXT,
      linkedin TEXT,
      portfolio TEXT,
      photo TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
};

const startServer = async () => {
  try {
    await initDb();
    await seedDemoUser();
    app.listen(PORT, () => {
      console.log(`Auth server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server with SQLite", error);
    process.exit(1);
  }
};

startServer();
