  const express = require('express');
  const userRoutes = require('./routes/users');
  const employeeRoutes = require('./routes/employees');
  const mongoose = require('mongoose');
  const app = express();

  const DB_CONNECTION_STRING = process.env.DB_URI || 'mongodb://admin:admin@mongo:27017/admin';

  mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/emp', employeeRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });