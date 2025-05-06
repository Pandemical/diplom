import { $host, $authhost } from './api';

export const registration = async (email: string, password: string) => {
  const response = await $host.post('/user/registration', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await $host.post('/user/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const checkAuth = async () => {
  const response = await $authhost.get('/auth');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
