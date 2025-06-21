import Header from '../../components/header/header';
import styles from './analiticks-page.module.css';
import { Select } from '@mantine/core';
import { MonthPickerInput } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import iconMap from '../../utils/categoryIcons';
import { useAnalyticsPage } from '../../hooks/useAnalyticsPage';

function AnaliticksPage() {
  const {
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
  } = useAnalyticsPage();

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <div className={styles['side-bar']}>
              <p>Аналитика</p>
              <MonthPickerInput
                w={225}
                label="Выберите месяц"
                value={selectedMonth}
                onChange={setSelectedMonth}
                clearable
              />
              <Select
                w={225}
                label="Выберите счёт"
                placeholder="Все счета"
                data={bills.map((bill) => ({
                  value: bill.id.toString(),
                  label: bill.title,
                }))}
                value={selectedBillId}
                onChange={setSelectedBillId}
                clearable
              />
            </div>
            <div className={styles['main-content']}>
              <div className={styles['income-statement']}>
                <h2>Отчет о доходах и расходах — {monthName}</h2>
                <div className={styles['income-expense']}>
                  <div className={styles['income']}>
                    <div className={styles['sum-income']}>
                      <strong>Суммарные доходы: {totalIncome.toFixed(2)} ₽</strong>
                    </div>
                    <div className={styles['list-income']}>
                      {incomeCategories.map((cat) => (
                        <div key={cat.id} className={styles['item-expense']}>
                          <div
                            className={styles['background-category']}
                            style={{ backgroundColor: cat.color }}
                          >
                            {iconMap[cat.img] || iconMap['IconDots']}
                          </div>
                          {cat.name}: {getSumByCategory(cat.id).toFixed(2)} ₽
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles['expense']}>
                    <div className={styles['sum-expense']}>
                      <strong>Суммарные расходы: {totalExpense.toFixed(2)} ₽</strong>
                    </div>
                    <div className={styles['list-expense']}>
                      {expenseCategories.map((cat) => (
                        <div key={cat.id} className={styles['item-expense']}>
                          <div
                            className={styles['background-category']}
                            style={{ backgroundColor: cat.color }}
                          >
                            {iconMap[cat.img] || iconMap['IconDots']}
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