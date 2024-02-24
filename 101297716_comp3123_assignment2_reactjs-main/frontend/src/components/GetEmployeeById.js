import React, { useState } from 'react';
import { getEmployeeById } from '../services/api';

const GetEmployeeById = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);

  const handleGetEmployee = async () => {
    try {
      const employee = await getEmployeeById(employeeId);
      setEmployeeData(employee);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Get Employee by ID</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button onClick={handleGetEmployee}>Get Employee</button>
      {employeeData && (
        <div>
          <h3>Employee Details</h3>
          <p>ID: {employeeData._id}</p>
          <p>First Name: {employeeData.first_name}</p>
          <p>Last Name: {employeeData.last_name}</p>
          <p>Email: {employeeData.email}</p>
          <p>Gender: {employeeData.gender}</p>
          <p>Salary: {employeeData.salary}</p>
        </div>
      )}
    </div>
  );
};

export default GetEmployeeById;
