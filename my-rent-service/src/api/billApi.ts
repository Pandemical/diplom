import { $host, $authhost } from './api';

export const createBill = async (title: string, amount: number, currency: string, color: string, type: string) => {
  const {data} = await $authhost.post('/bill', { title, amount,currency,color,type });
  return data;
};

export const fetchBill = async () => {
  const { data } = await $authhost.get('/bill'); // был $host
  return data;
};
