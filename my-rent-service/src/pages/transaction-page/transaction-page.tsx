import { useEffect, useState } from 'react';
import { Select } from '@mantine/core';
import { Bill } from '../../types/bill';
import { Transaction } from '../../types/transaction';
import { fetchTransaction, createTransaction, deleteTransaction } from '../../api/transactionApi';
import { fetchCategory } from '../../api/categoryApi';
import { fetchBill } from '../../api/billApi';
import TransactionCard from '../../components/transaction-card/transaction-card';
import Header from '../../components/header/header';
import AddTransactionModal from '../../components/addTransactionModal/addTransactionModal'; 
import { Category } from '../../types/category';
import styles from './transaction-page.module.css'


function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [billId, setBillId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      const tx = await fetchTransaction();
      setTransactions(tx);
    };

    const loadBills = async () => {
      const fetchedBills = await fetchBill();
      setBills(fetchedBills);
    };

    const loadCategories = async () => {
      const data = await fetchCategory();
      setCategories(data);
    };

    loadTransactions();
    loadBills();
    loadCategories();
  }, []);

  const filtered = transactions.filter((tx) => {
    if (!filterCategory) return true;
    return tx.category?.name === filterCategory;
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
      await Promise.all(selectedIds.map(id => deleteTransaction(id)));
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
      await createTransaction(
        Number(amount),
        new Date(),
        Number(category),
        Number(billId)
      );

      setModalOpen(false);
      setAmount('');
      setBillId(null);
      setCategory(null);
      const tx = await fetchTransaction();
      setTransactions(tx);
    } catch (error) {
      console.error('Ошибка при создании транзакции:', error);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <aside className={styles["side-bar"]}>
              <p>Транзакции</p>
              <button onClick={() => setModalOpen(true)}>+ Добавить</button>
              <Select
                label="Фильтр по категориям"
                placeholder="Выберите категорию"
                data={categories.map((cat) => ({
                  value: cat.name,
                  label: cat.name,
                }))}
                value={filterCategory}
                onChange={setFilterCategory}
                clearable
                searchable
              />
            </aside>
            <div className="main-content">
              <div className={styles.actionsContainer}>
                <button 
                  onClick={handleSelectAll}
                  className={`${styles.actionButton} ${styles.selectAllButton}`}
                >
                  Выбрать все
                </button>
                <button 
                  onClick={handleClearSelection}
                  className={`${styles.actionButton} ${styles.clearSelectionButton}`}
                >
                  Снять выбор
                </button>
                <button 
                  onClick={handleDeleteSelected} 
                  disabled={selectedIds.length === 0}
                  className={`${styles.actionButton} ${styles.deleteSelectedButton}`}
                >
                  Удалить выбранные
                </button>
              </div>
              <div className="list-bills">
                {filtered.map((tx) => (
                  <TransactionCard
                    key={tx.id}
                    transaction={tx}
                    checked={selectedIds.includes(tx.id)}
                    onCheck={handleCheck}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddTransactionModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={amount}
        setAmount={setAmount}
        billId={billId}
        setBillId={setBillId}
        category={category}
        setCategory={setCategory}
        bills={bills}
        categories={categories}
        onSubmit={handleAddTransaction}
      />
    </>
  );
}

export default TransactionPage;