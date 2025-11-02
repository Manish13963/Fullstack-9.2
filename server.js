const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint for ALB
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', server: process.env.SERVER_ID || 'unknown' });
});

// Sample API endpoint
app.get('/api/data', async (req, res) => {
  res.json({ message: 'Hello from backend!', server: process.env.SERVER_ID || 'unknown' });
});

// MongoDB connection (optional for now)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB error:', err));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
