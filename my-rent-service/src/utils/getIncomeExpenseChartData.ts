import { Transaction } from "../types/transaction";

export function getIncomeExpenseChartData(transactions: Transaction[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const dailyData: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((tx) => {
    const txDate = new Date(tx.date);
    if (
      txDate.getMonth() !== currentMonth ||
      txDate.getFullYear() !== currentYear
    ) {
      return;
    }

    const dateLabel = txDate.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "short",
    });

    if (!dailyData[dateLabel]) {
      dailyData[dateLabel] = { income: 0, expense: 0 };
    }

    if (tx.category_transaction.type === "income") {
      dailyData[dateLabel].income += tx.amount;
    } else {
      dailyData[dateLabel].expense += tx.amount;
    }
  });

  return Object.entries(dailyData)
    .map(([date, { income, expense }]) => ({
      date,
      Доход: income,
      Расход: expense,
    }))
    .sort(
      (a, b) =>
        new Date(`${a.date} ${now.getFullYear()}`).getTime() -
        new Date(`${b.date} ${now.getFullYear()}`).getTime()
    );
}
