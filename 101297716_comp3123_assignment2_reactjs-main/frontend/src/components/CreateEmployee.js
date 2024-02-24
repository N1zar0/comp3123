import React, { useState } from 'react';
import { createEmployee } from '../services/api';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await createEmployee(formData);
      console.log('New employee created:', newEmployee);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Create Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
