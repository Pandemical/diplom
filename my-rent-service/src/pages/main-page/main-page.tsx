import { JSX, useEffect, useState } from "react";
import MoneyCard from "../../components/money-card/money-card";
import Header from "../../components/header/header";
import AddBillModal from "../../components/addBillModal/addBillModal";
import { DonutChart, LineChart } from "@mantine/charts";
import { MonthPickerInput } from "@mantine/dates";
import { Bill } from "../../types/bill";
import { Transaction } from "../../types/transaction";
import { createBill, fetchBill } from "../../api/billApi";
import { fetchTransaction } from "../../api/transactionApi";
import { getDonutDataFromTransactions } from "../../utils/getDonutDataFromTransactions";
import { getIncomeExpenseChartData } from "../../utils/getIncomeExpenseChartData";
import TransactionCard from "../../components/transaction-card/transaction-card";


import '@mantine/core/styles.css';
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import styles from './main-page.module.css';

function MainPage(): JSX.Element {
  const [modalOpened, setModalOpened] = useState(false);
  const [cards, setCards] = useState<Bill[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const donutData = getDonutDataFromTransactions(transactions);
  const incomeExpenseData = getIncomeExpenseChartData(transactions);

  const handleAddBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      const createdBill = await createBill(
        bill.title,
        bill.amount,
        bill.currency,
        bill.color,
        bill.type
      );
      setCards((prev) => [...prev, createdBill]);
    } catch (error) {
      console.error("Ошибка при создании счёта:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bills, txs] = await Promise.all([
          fetchBill(),
          fetchTransaction()
        ]);
        setCards(bills);
        setTransactions(txs);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content">
            <div className="my-money">
              <p>Мои финансы</p>
              <div className={styles.money}>
                {cards.map((bill) => (
                  <MoneyCard key={bill.id} bill={bill} />
                ))}
                {cards.length < 5 && (
                  <button className="add-money" onClick={() => setModalOpened(true)}>+ Добавить счёт</button>
                )}
              </div>
            </div>

            <div className="MonthPicker">
              <MonthPickerInput placeholder="Выберите месяц" label="Период" />
            </div>
            <div className={styles["content-block"]}>
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Структура расходов</span>
                </div>
                <span>В этом месяце: </span>
                <span>-{donutData.reduce((sum, item) => sum + item.value, 0)} ₽</span>
                <div className={styles["chart-container"]}>
                  <DonutChart data={donutData} />
                </div>
              </div>

              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Сравнение по периодам</span>
                </div>
                <div className={styles["Area-chart"]}>
                  <LineChart
                    data={incomeExpenseData}
                    dataKey="date"
                    series={[
                      { name: "Доход", color: "green.6" },
                      { name: "Расход", color: "red.6" },
                    ]}
                  />
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Последние транзакции</span>
                </div>
                <div className={styles["transaction-list"]}>
                  {transactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 4)
                    .map((transaction) => (
                      <TransactionCard key={transaction.id} transaction={transaction} showCheckbox={false} showDate={false} className={styles["transaction-dashboard"]}/>
                    ))}
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Счета</span>
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Тенденция баланса</span>
                </div>
              </div>
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Сравнение по периодам</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddBillModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSave={handleAddBill}
      />
    </>
  );
}

export default MainPage;
