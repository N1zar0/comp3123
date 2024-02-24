const express = require('express');
const router = express.Router();
const Emp = require('../models/EmployeeModel'); 

// Create a new Employee
router.post('/employees', async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    const newEmployee = new Emp({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'New employee created', employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the employee', error: error.message });
  }
});

// Get all Employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Emp.find();

    res.status(200).json({ message: 'List of all employees', employees });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching employees', error: error.message });
  }
});

// Get Employee Details by ID
router.get('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const employee = await Emp.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee details by ID', employee });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching employee details', error: error.message });
  }
});

// Update Employee Details by ID
router.put('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const updatedEmployeeData = req.body;
    const updatedEmployee = await Emp.findByIdAndUpdate(employeeId, updatedEmployeeData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee details updated', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating employee details', error: error.message });
  }
});

// Delete Employee by ID
router.delete('/employees/:eid', async (req, res) => {
  try {
    const employeeId = req.params.eid;
    const deletedEmployee = await Emp.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting employee', error: error.message });
  }
});

module.exports = router;
