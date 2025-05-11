import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import styles from './analiticks-page.module.css';
import { fetchCategory } from '../../api/categoryApi';
import { fetchTransaction } from '../../api/transactionApi';
import { Category } from '../../types/category';
import { Transaction } from '../../types/transaction';
import iconMap from '../../utils/categoryIcons';

function AnaliticksPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedCategories, fetchedTransactions] = await Promise.all([
        fetchCategory(),
        fetchTransaction(),
      ]);
        console.log('Категории:', fetchedCategories);
        console.log('Транзакции:', fetchedTransactions);
      setCategories(fetchedCategories);
      setTransactions(fetchedTransactions);
    };

    loadData();
  }, []);

  const getSumByCategory = (categoryId: number) => {
    return transactions
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

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <div className={styles["side-bar"]}>
              <p>Аналитика</p>
              <span>Фильтры</span>
              {/* Здесь могут быть фильтры по счетам и т.д. */}
            </div>
            <div className={styles["main-content"]}>
              <div className={styles["income-statement"]}>
                <h2>Отчет о доходах и расходах</h2>
                <div className={styles["income-expense"]}>
                  <div className={styles["income"]}>
                    <div className={styles["sum-income"]}>
                      <strong>Суммарные доходы: {totalIncome.toFixed(2)} ₽</strong>
                    </div>
                    <div className={styles["list-income"]}>
                      {incomeCategories.map((cat) => (
                        <div key={cat.id} className={styles["item-expense"]}>
                          <div className={styles["background-category"]} style={{ backgroundColor: cat.color }}>
                            {iconMap[cat.img] || iconMap["IconDots"]}
                          </div>
                          {cat.name}: {getSumByCategory(cat.id).toFixed(2)} ₽
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles["expense"]}>
                    <div className={styles["sum-expense"]}>
                      <strong>Суммарные расходы: {totalExpense.toFixed(2)} ₽</strong>
                    </div>
                    <div className={styles["list-expense"]}>
                      {expenseCategories.map((cat) => (
                        <div key={cat.id} className={styles["item-expense"]}>
                    <div className={styles["background-category"]} style={{ backgroundColor: cat.color }}>
                    {iconMap?.[cat.img] ?? iconMap["IconDots"]}
                    </div>
                          {cat.name}: {getSumByCategory(cat.id).toFixed(2)} ₽
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AnaliticksPage;