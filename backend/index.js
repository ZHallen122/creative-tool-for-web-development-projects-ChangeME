import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { exec } from 'child_process';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './database.sqlite';
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize Database Schema
const initializeDatabase = () => {
  const initSchema = fs.readFileSync('./schema.sql', 'utf-8');
  db.exec(initSchema, (err) => {
    if (err) {
      console.error('Error executing schema:', err);
    } else {
      console.log('Database schema initialized.');
    }
  });
};

// User Registration
app.post('/api/users/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = hashPassword(password); // A function to hash passwords using bcrypt
  
  db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword], function(err) {
    if (err) {
      return res.status(409).json({ message: 'User already exists' });
    }
    res.status(201).json({ message: 'User registered successfully', user: { userId: this.lastID, username, email } });
  });
});

// User Login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user || !verifyPassword(password, user.password)) { // Function to verify passwords
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token, user: { userId: user.id, username: user.username } });
  });
});

// Fetch Templates
app.get('/api/templates', (req, res) => {
  const featured = req.query.featured === 'true';
  
  db.all(`SELECT * FROM templates WHERE featured = ?`, [featured], (err, templates) => {
    if (err) {
      return res.status(400).json({ message: 'Bad request' });
    }
    res.json({ templates });
  });
});

// Create a Project
app.post('/api/projects', authenticateToken, (req, res) => {
  const { templateId, title } = req.body;

  db.run(`INSERT INTO projects (templateId, userId, title, status) VALUES (?, ?, ?, ?)`, [templateId, req.user.userId, title, 'in-progress'], function(err) {
    if (err) {
      return res.status(400).json({ message: 'Invalid data' });
    }
    res.status(201).json({ projectId: this.lastID, title, status: 'in-progress' });
  });
});

// Middleware for Authentication
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Hash Password function (for illustration; use bcrypt library)
const hashPassword = (password) => {
  // Implementation goes here (e.g., using bcrypt)
  return password; // Replace this with actual hashed password
};
  
// Verify Password function (for illustration; use bcrypt library)
const verifyPassword = (password, hashedPassword) => {
  // Implementation goes here (e.g., using bcrypt)
  return password === hashedPassword; // Replace this with actual verification
};

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});