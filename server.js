const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/noteRoutes');

const app = express();

// 🔥 PORT (Railway compatible)
const PORT = process.env.PORT || 5000;

// 🔥 MongoDB (use env only)
const MONGODB_URI = process.env.MONGODB_URI;

// 🔥 CORS (FIXED)
app.use(cors({
  origin: ["http://localhost:5173"], // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 🔥 MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// 🔥 Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 🔥 Routes
app.use('/api/notes', noteRoutes);

// 🔥 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});