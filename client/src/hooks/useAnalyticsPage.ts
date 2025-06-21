import { useEffect, useState } from 'react';
import { fetchCategory } from '../api/categoryApi';
import { fetchTransaction } from '../api/transactionApi';
import { fetchBill } from '../api/billApi';
import { Category } from '../types/category';
import { Transaction } from '../types/transaction';
import { Bill } from '../types/bill';

export function useAnalyticsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedCategories, fetchedTransactions, fetchedBills] = await Promise.all([
        fetchCategory(),
        fetchTransaction(),
        fetchBill()
      ]);
      setCategories(fetchedCategories);
      setTransactions(fetchedTransactions);
      setBills(fetchedBills);
    };

    loadData();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const inMonth =
      selectedMonth
        ? txDate.getMonth() === selectedMonth.getMonth() &&
          txDate.getFullYear() === selectedMonth.getFullYear()
        : true;

    const byBill = selectedBillId ? tx.bill?.id === +selectedBillId : true;

    return inMonth && byBill;
  });

  const getSumByCategory = (categoryId: number) => {
    return filteredTransactions
      .filter((tx) => tx.category_transaction?.id === categoryId)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
  };

  const incomeCategories = categories.filter((cat) => cat.type === 'income');
  const expenseCategories = categories.filter((cat) => cat.type === 'expense');

  const totalIncome = incomeCategories.reduce(
    (sum, cat) => sum + getSumByCategory(cat.id),
    0
  );

  const totalExpense = expenseCategories.reduce(
    (sum, cat) => sum + getSumByCategory(cat.id),
    0
  );

  const monthName = selectedMonth?.toLocaleString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  return {
    categories,
    incomeCategories,
    expenseCategories,
    totalIncome,
    totalExpense,
    bills,
    selectedMonth,
    setSelectedMonth,
    selectedBillId,
    setSelectedBillId,
    getSumByCategory,
    monthName,
  };
}
