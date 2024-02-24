import React, { useState, useEffect } from 'react';
import { getAllEmployees } from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data.employees);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {error && <p>{error}</p>}
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.first_name} {employee.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
