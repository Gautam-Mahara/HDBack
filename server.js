const express = require('express');
const cors = require('cors');
// const path = require('path');
const adventureRoutes = require('./routes/adventureRoutes');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentroutes')
// const { url } = require('inspector');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
console.log('request');
const MONGO_URI = process.env.MONGO_URL;
app.use(cors({
  origin: [
    'http://localhost:5173',      
    'https://hd-front.vercel.app' 
  ],
  credentials: true, // (optional) if you're sending cookies/auth
}));

app.use(express.json());
//connect to MongoDB
const connDB=mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Serve static images from uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/adventures', adventureRoutes);
app.use('/api/payment',paymentRoutes)
// Root endpoint
app.get('/', (req, res) => {
  res.send('Adventure API is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

module.exports = connDB;