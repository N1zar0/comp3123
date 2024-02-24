import React from 'react';
import UserLogin from './components/UserLogin';
import EmployeeList  from './components/GetEmployees';
import CreateEmployee from './components/CreateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import GetEmployeeById from './components/GetEmployeeById';
import UpdateEmployee from './components/UpdateEmployee';
import UserSignup from './components/UserSignup';

function App() {
  return (
    <div>
      <UserLogin />
      <EmployeeList />
      <CreateEmployee />
      <DeleteEmployee />
      <GetEmployeeById />
      <UpdateEmployee />
      <UserSignup />
    </div>
  );
}

export default App;
