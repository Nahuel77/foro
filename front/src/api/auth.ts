import API from './api';

export const register = (formData: { email: string; password: string }) => {
  return API.post('/api/auth/register', formData);
};

export const login = (formData: { email: string; password: string }) => {
  return API.post('/api/auth/login', formData);
};

export const newPost = (formData: { title: string; content: string; seccion: string }) => {
  return API.post('/api/posts/newpost', formData);
}