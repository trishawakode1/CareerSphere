import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "replace-this-secret-in-production";

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

let users = [
  {
    id: 1,
    username: "demo",
    passwordHash: bcrypt.hashSync("demo1234", 10),
    role: "student",
  },
];
let nextUserId = 2;

const signToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "2h" },
  );

const sanitizeUser = (user) => ({
  id: user.id,
  username: user.username,
  role: user.role,
});

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
  const existingUser = users.find((u) => u.username === normalizedUsername);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: nextUserId,
    username: normalizedUsername,
    passwordHash,
    role: "student",
  };
  users.push(newUser);
  nextUserId += 1;

  const token = signToken(newUser);
  return res.status(201).json({
    message: "Registered successfully",
    token,
    user: sanitizeUser(newUser),
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const normalizedUsername = String(username).trim().toLowerCase();
  const user = users.find((u) => u.username === normalizedUsername);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user);
  return res.json({
    message: "Logged in successfully",
    token,
    user: sanitizeUser(user),
  });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({ user: sanitizeUser(user) });
});

app.post("/api/auth/logout", (_req, res) => {
  return res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
