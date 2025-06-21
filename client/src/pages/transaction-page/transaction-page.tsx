import Header from '../../components/header/header';
import TransactionCard from '../../components/transaction-card/transaction-card';
import AddTransactionModal from '../../components/addTransactionModal/addTransactionModal';
import { Select } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import styles from './transaction-page.module.css';
import {useTransactionPage} from '../../hooks/useTransactionPage';

function TransactionPage() {
  const {
    transactions,
    categories,
    bills,
    selectedMonth,
    setSelectedMonth,
    filterCategory,
    setFilterCategory,
    modalOpen,
    setModalOpen,
    selectedIds,
    handleCheck,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
    amount,
    setAmount,
    billId,
    setBillId,
    category,
    setCategory,
    handleAddTransaction,
  } = useTransactionPage();

  const filteredTransactions = transactions
    .filter((tx) => {
      if (!filterCategory) return true;
      return tx.category_transaction?.name === filterCategory;
    })
    .filter((tx) => {
      if (!selectedMonth) return true;
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === selectedMonth.getMonth() &&
        txDate.getFullYear() === selectedMonth.getFullYear()
      );
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <aside className={styles["side-bar"]}>
              <p>Транзакции</p>
              <button onClick={() => setModalOpen(true)}>+ Добавить</button>
              <MonthPickerInput
                w={225}
                label="Фильтр по месяцу"
                placeholder="Выберите месяц"
                value={selectedMonth}
                onChange={setSelectedMonth}
                clearable
              />
              <Select
                w={225}
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
                {filteredTransactions.length === 0 ? (
                  <p style={{ textAlign: 'center', marginTop: '2rem' }}>
                    Транзакции за выбранный период отсутствуют
                  </p>
                ) : (
                  filteredTransactions.map((tx) => (
                    <TransactionCard
                      key={tx.id}
                      transaction={tx}
                      checked={selectedIds.includes(tx.id)}
                      onCheck={handleCheck}
                    />
                  ))
                )}
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