import { Transaction } from "../types/transaction";

export function getIncomeExpenseChartData(transactions: Transaction[]) {

  const dailyData: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((tx) => {
    const txDate = new Date(tx.date);

  const isoDate = txDate.toLocaleDateString("sv-SE"); 


    if (!dailyData[isoDate]) {
      dailyData[isoDate] = { income: 0, expense: 0 };
    }

    if (tx.category_transaction.type === "income") {
      dailyData[isoDate].income += tx.amount;
    } else {
      dailyData[isoDate].expense += tx.amount;
    }
  });

  return Object.entries(dailyData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, { income, expense }]) => ({
      date,
      Доход: income,
      Расход: expense,
    }));
}
