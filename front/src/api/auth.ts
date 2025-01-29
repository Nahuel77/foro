import API from './api';

interface Quote {
  userName: string | null;
  date: string | null;
  text: string | null;
}

export const register = (formData: { email: string; password: string; userName: string }) => {
  return API.post('/api/auth/register', formData);
};

export const login = (formData: { email: string; password: string }) => {
  return API.post('/api/auth/login', formData);
};

export const newPost = (formData: { title: string; content: string; seccion: string; userName: string }) => {
  return API.post('/api/posts/newpost', formData);
};

export const getPosts = ({ section, top }: { section: string; top: string }) => {
  return API.get(`/api/posts/getposts/${section}/${top}`);
};

export const getPostById = (id: string) => {
  return API.get(`/api/posts/getpostbyid/${id}`);
};

export const getSections = (queryParams: { [key: string]: any } = {}) => {
  const query = new URLSearchParams(queryParams).toString();
  return API.get(`/api/secciones/getsection${query ? `?${query}` : ''}`);
};

export const newComment = (formData: {
  content: string;
  userName: string;
  postId: string,
  quote: Quote[];
}) => {
  return API.post('/api/posts/newcomment', formData);
};

export const getComments = (id: string) => {
  return API.get(`/api/posts/getcomments/${id}`);
};

export const getLatestComments = () => {
  return API.get(`/api/posts/getlatestcomments`);
};

export const deleteContent = ({ content, id }: { content: string, id: string }) => {
  return API.delete(`/api/posts/deletecontent/${content}/${id}`);
};

export const updateContent = (formData: { contentType: string, id: string, update: { content: string, title: string } }) => {
  return API.put('/api/posts/updatecontent', formData);
};

export const passwordChange = (formData: { pass: string, newpass: string }) => {
  return API.put('/api/auth/changepassword', formData);
};

export const uploadpic = (data: { pic: File }) => {
  const formData = new FormData();
  formData.append('file', data.pic);

  return API.put('/api/auth/uploadpic', formData);
};