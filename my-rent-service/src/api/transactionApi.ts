import { $authhost } from './api';

export const createTransaction = async (amount: number, date: Date, categoryId: number,  billId: number) => {
  const {data} = await $authhost.post('/transaction', { amount,date,categoryId,billId }); 
  return data;
};

export const fetchTransaction = async () => {
  const { data } = await $authhost.get('/transaction');
  return data;
};

export const deleteTransaction = async (id: number | string) => {
  const { data } = await $authhost.delete(`/transaction/${id}`);
  return data;
};