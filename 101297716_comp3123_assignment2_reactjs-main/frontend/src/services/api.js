import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/users/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await api.get('/employees');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getEmployeeById = async (employeeId) => {
  try {
    const response = await api.get(`/employees/${employeeId}`);
    return response.data.employee; 
  } catch (error) {
    throw error.response.data;
  }
};

export const updateEmployee = async (employeeId, updatedData) => {
  try {
    const response = await api.put(`/employees/${employeeId}`, updatedData);
    return response.data.employee; 
  } catch (error) {
    throw error.response.data;
  }
};

export const userSignup = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data.user; 
  } catch (error) {
    throw error.response.data;
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/employees', employeeData);
    return response.data.employee; 
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await api.delete(`/employees/${employeeId}`);
    if (response.status === 204) {
      return 'Employee deleted successfully'; 
    }
    throw new Error('Failed to delete employee');
  } catch (error) {
    throw error.response.data;
  }
};