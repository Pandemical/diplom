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
import BillCard from "../../components/bill/bill";
import { Text } from "@mantine/core";



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
    // Общий баланс
  const totalBalance = cards.reduce((sum, bill) => sum + bill.amount, 0);

  // Оборот: сумма всех доходов и расходов
  const turnover = transactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Расходы (отрицательные значения)
  const totalExpenses = transactions
    .filter((tx) => tx.category_transaction.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);




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
                  <span>Тенденция баланса</span>
                </div>
                <div className={styles["balance-trend"]}>
                  <p><strong>Общий баланс:</strong> <Text span fw={700} c="yellow" >{totalBalance} ₽</Text> </p>
                  <p><strong>Оборот:</strong> <Text span fw={700} c={turnover >= 0 ? 'green' : 'red'}>{turnover} ₽</Text> </p>
                  <p><strong>Расходы:</strong> <Text span fw={700} c="red">{totalExpenses} ₽</Text></p>
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
                <div className={styles["bill-list"]}>
                  {cards
                    .slice(-4)
                    .reverse()
                    .map((bill) => (
                      <BillCard
                        key={bill.id}
                        bill={bill}
                        showMenu={false} 
                        className={styles["bill-dashboard"]} 
                      />
                    ))}
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
                    xAxisProps={{
                      tickFormatter: (value) =>
                        new Date(value).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "short",
                        }),
                    }}
                  />

                </div>
              </div>            
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Совет по оптимизации расходов</span>
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
