import { $authhost } from './api';

export const createBill = async (title: string, amount: number, currency: string, color: string, typeBillId: number) => {
  const {data} = await $authhost.post('/bill', { title, amount,currency,color,typeBillId });
  return data;
};

export const fetchBill = async () => {
  const { data } = await $authhost.get('/bill');
  return data;
};

export const deleteBill = async (id: number | string) => {
  const { data } = await $authhost.delete(`/bill/${id}`);
  return data;
};