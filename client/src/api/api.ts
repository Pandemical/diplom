import axios, { InternalAxiosRequestConfig } from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const $authhost = axios.create({
  baseURL: 'http://localhost:5000/api',
});


const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

$authhost.interceptors.request.use(authInterceptor);

export { $host, $authhost };
