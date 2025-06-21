import { $authhost } from './api';

export const createCategory = async (name: number, img: string) => {
  const {data} = await $authhost.post('/category', { name,img}); 
  return data;
};

export const fetchCategory = async () => {
  const { data } = await $authhost.get('/category');
  return data;
};

export const deleteCategory = async (id: number) => {
  const { data } = await $authhost.delete(`/category/${id}`);
  return data;
};