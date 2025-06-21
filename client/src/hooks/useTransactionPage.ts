import { useEffect, useState } from 'react';
import { fetchTransaction, createTransaction, deleteTransaction } from '../api/transactionApi';
import { fetchCategory } from '../api/categoryApi';
import { fetchBill, updateBill } from '../api/billApi';
import { Bill } from '../types/bill';
import { Transaction } from '../types/transaction';
import { Category } from '../types/category';

export const useTransactionPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());

  const [billId, setBillId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const [tx, fetchedBills, fetchedCategories] = await Promise.all([
        fetchTransaction(),
        fetchBill(),
        fetchCategory(),
      ]);

      setTransactions(tx);
      setBills(fetchedBills);
      setCategories(fetchedCategories);
    };

    loadData();
  }, []);

  const filteredByCategory = transactions.filter((tx) => {
    if (!filterCategory) return true;
    return tx.category_transaction?.name === filterCategory;
  });

  const filtered = filteredByCategory.filter((tx) => {
    if (!selectedMonth) return true;
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() === selectedMonth.getMonth() &&
      txDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const handleCheck = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(filtered.map((tx) => tx.id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteTransaction(id)));
      const updated = await fetchTransaction();
      setTransactions(updated);
      setSelectedIds([]);
    } catch (err) {
      console.error('Ошибка удаления транзакций:', err);
    }
  };

  const handleAddTransaction = async () => {
    if (!amount || !billId || !category) return;

    try {
      const parsedAmount = Number(amount);
const selectedCategory = categories.find((cat) => cat.id === Number(category));
const selectedBill = bills.find((bill) => Number(bill.id) === Number(billId));


      if (!selectedCategory || !selectedBill) {
        console.error('Категория или счёт не найдены');
        return;
      }

      let newBalance = selectedBill.amount;

      if (selectedCategory.type === 'income') {
        newBalance += parsedAmount;
      } else if (selectedCategory.type === 'expense') {
        newBalance -= parsedAmount;
      }

      // Создание транзакции
      await createTransaction(
        parsedAmount,
        new Date(),
        Number(category),
        Number(billId)
      );

      // Обновление счёта
      await updateBill(Number(selectedBill.id), { amount: newBalance });

      // Сброс формы и обновление данных
      setModalOpen(false);
      setAmount('');
      setBillId(null);
      setCategory(null);

      const [tx, updatedBills] = await Promise.all([
        fetchTransaction(),
        fetchBill()
      ]);

      setTransactions(tx);
      setBills(updatedBills);
    } catch (error) {
      console.error('Ошибка при создании транзакции:', error);
    }
  };

  return {
    transactions,
    bills,
    categories,
    filterCategory,
    setFilterCategory,
    modalOpen,
    setModalOpen,
    selectedIds,
    selectedMonth,
    setSelectedMonth,
    billId,
    setBillId,
    amount,
    setAmount,
    category,
    setCategory,
    handleCheck,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
    handleAddTransaction,
    filtered,
  };
};
