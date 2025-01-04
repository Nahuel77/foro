import API from './api';

export const register = (formData: { email: string; password: string }) => {
  return API.post('/register', formData);
};

export const login = (formData: { email: string; password: string }) => {
  return API.post('/login', formData);
};