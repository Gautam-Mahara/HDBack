const express = require('express');
const cors = require('cors');
const path = require('path');
const adventureRoutes = require('./routes/adventureRoutes');
const mongoose = require('mongoose');
const paymentRoutes = require('./routes/paymentroutes')
const { url } = require('inspector');


const app = express();
const PORT = 5000;

// Middleware
console.log('request');

app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend requests
app.use(express.json());
//connect to MongoDB
const connDB=mongoose.connect('mongodb+srv://Jenn:Janki6121@cluster0.vqk5j27.mongodb.net/TravelDb'
).then(() => {
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