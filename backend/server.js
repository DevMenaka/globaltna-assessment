const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Express app initialize 
const app = express();

// Middleware 
app.use(cors()); // Frontend requests allow
app.use(express.json()); // Read Frontend requests as JSON format 

// Routes connection 
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

//Global Error Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Read Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection and Server Start 
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');
    // Database Connection After Start server run
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error.message);
  });