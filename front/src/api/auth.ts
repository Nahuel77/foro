import API from './api';

export const register = (formData: { email: string; password: string; userName: string }) => {
  return API.post('/api/auth/register', formData);
};

export const login = (formData: { email: string; password: string }) => {
  return API.post('/api/auth/login', formData);
};

export const newPost = (formData: { title: string; content: string; seccion: string; userName: string }) => {
  return API.post('/api/posts/newpost', formData);
};

export const loadPosts = (queryParams: { [key: string]: any } = {}) => {
  const query = new URLSearchParams(queryParams).toString();
  return API.get(`/api/posts/getposts${query ? `?${query}` : ''}`);
};

export const getPostById = (id: string) => {
  return API.get(`/api/posts/${id}`);
};

export const loadSecciones = (queryParams: { [key: string]: any } = {}) => {
  const query = new URLSearchParams(queryParams).toString();
  return API.get(`/api/secciones/getsection${query ? `?${query}` : ''}`);
};

export const newComment = (formData: { content: string; userName: string; postId: string }) => {
  return API.post('/api/posts/newcomment', formData);
};

export const getComments = (id: string) => {
  return API.get(`/api/posts/getcomments/${id}`);
}