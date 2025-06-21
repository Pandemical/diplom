import { JSX } from "react";
import MoneyCard from "../../components/money-card/money-card";
import Header from "../../components/header/header";
import AddBillModal from "../../components/addBillModal/addBillModal";
import { DonutChart, LineChart } from "@mantine/charts";
import { MonthPickerInput } from "@mantine/dates";
import { Text } from "@mantine/core";
import EmptyPlaceholder from "../../components/empty-placeholder/empty-placeholder";
import TransactionCard from "../../components/transaction-card/transaction-card";
import BillCard from "../../components/bill/bill";
import { getDonutDataFromTransactions } from "../../utils/getDonutDataFromTransactions";
import { getIncomeExpenseChartData } from "../../utils/getIncomeExpenseChartData";
import { useMainPage } from "../../hooks/useMainPage";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import styles from "./main-page.module.css";

function MainPage(): JSX.Element {
  const {
    modalOpened,
    setModalOpened,
    cards,
    transactions,
    selectedMonth,
    setSelectedMonth,
    recommendations,
    handleAddBill,
  } = useMainPage();

  const filteredTransactions = transactions.filter((tx) => {
    if (!selectedMonth) return true;
    const txDate = new Date(tx.date);
    return (
      txDate.getMonth() === selectedMonth.getMonth() &&
      txDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const donutData = getDonutDataFromTransactions(filteredTransactions);
  const incomeExpenseData = getIncomeExpenseChartData(filteredTransactions);
  const totalBalance = cards.reduce((sum, bill) => sum + bill.amount, 0);
  const turnover = filteredTransactions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const totalExpenses = filteredTransactions
    .filter((tx) => tx.category_transaction.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

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
                  <button className="add-money" onClick={() => setModalOpened(true)}>
                    + Добавить счёт
                  </button>
                )}
              </div>
            </div>

            <div className="MonthPicker">
              <MonthPickerInput
                placeholder="Выберите месяц"
                label="Период"
                value={selectedMonth}
                onChange={setSelectedMonth}
              />
            </div>
            <div className={styles["content-block"]}>
              {/* Структура расходов */}
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Структура расходов</span>
                </div>
                {donutData.length === 0 ? (
                  <EmptyPlaceholder message="Нет данных за выбранный период" />
                ) : (
                  <>
                    <span  className={styles["month-expenses"]} >В этом месяце: </span>
                    <span>-{donutData.reduce((sum, item) => sum + item.value, 0)} ₽</span>
                    <div className={styles["chart-container"]}>
                      <DonutChart data={donutData} />
                    </div>
                  </>
                )}
              </div>
              {/* Баланс */}
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Тенденция баланса</span>
                </div>
                {filteredTransactions.length === 0 ? (
                  <EmptyPlaceholder message="Нет данных за выбранный период" />
                ) : (
                  <div className={styles["balance-trend"]}>
                    <p>
                      <strong>Общий баланс:</strong>{" "}
                      <Text span fw={700} c="yellow">
                        {totalBalance} ₽
                      </Text>
                    </p>
                    <p>
                      <strong>Оборот:</strong>{" "}
                      <Text span fw={700} c={turnover >= 0 ? "green" : "red"}>
                        {turnover} ₽
                      </Text>
                    </p>
                    <p>
                      <strong>Расходы:</strong>{" "}
                      <Text span fw={700} c="red">
                        {totalExpenses} ₽
                      </Text>
                    </p>
                  </div>
                )}
              </div>

              {/* Последние транзакции */}
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Последние транзакции</span>
                </div>
                <div className={styles["transaction-list"]}>
                  {filteredTransactions.length === 0 ? (
                    <EmptyPlaceholder message="Нет данных за выбранный период" />
                  ) : (
                    filteredTransactions
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 4)
                      .map((transaction) => (
                        <TransactionCard
                          key={transaction.id}
                          transaction={transaction}
                          showCheckbox={false}
                          showDate={true}
                          className={styles["transaction-dashboard"]}
                        />
                      ))
                  )}
                </div>
              </div>

              {/* Последние счета */}
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

              {/* График доходов/расходов */}
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Сравнение по периодам</span>
                </div>
                <div className={styles["Area-chart"]}>
                  {incomeExpenseData.length === 0 ? (
                    <EmptyPlaceholder message="Нет данных за выбранный период" />
                  ) : (
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
                  )}
                </div>
              </div>

              {/* Рекомендации */}
              <div className={styles.block}>
                <div className={styles["block-name"]}>
                  <span>Совет по оптимизации расходов</span>
                </div>
                {recommendations.length === 0 ? (
                  <EmptyPlaceholder message="Нет рекомендаций на текущий момент" />
                ) : (
                  recommendations.map((rec, index) => (
                    <p className= {styles["text-optimize"]} key={index}>{rec.recommendation}</p>
                  ))
                )}
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

dayjs.locale("ru");
export default MainPage;
