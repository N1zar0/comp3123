import React, { useState } from 'react';
import { updateEmployee } from '../services/api';

const UpdateEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = await updateEmployee(formData.employeeId, formData);
      console.log('Employee updated:', updatedEmployee);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="number"
        placeholder="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update Employee</button>
    </div>
  );
};

export default UpdateEmployee;
