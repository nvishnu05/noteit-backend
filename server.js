const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/noteRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// 🔥 SIMPLE CORS (no restriction)
app.use(cors());

app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});