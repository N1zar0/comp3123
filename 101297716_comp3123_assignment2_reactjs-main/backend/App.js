const express = require('express');
const app = express();

const userRoutes = require('./routes/UserRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
