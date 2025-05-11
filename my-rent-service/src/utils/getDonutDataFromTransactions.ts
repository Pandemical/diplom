import { Transaction } from '../types/transaction';

export const getDonutDataFromTransactions = (transactions: Transaction[]) => {
  const expenseMap: Record<string, { name: string; value: number; color: string }> = {};

  transactions.forEach((tx) => {
    if (tx.category_transaction?.type === 'expense') {
      const categoryName = tx.category_transaction.name;
      const categoryColor = tx.category_transaction.color || 'gray';

      if (!expenseMap[categoryName]) {
        expenseMap[categoryName] = {
          name: categoryName,
          value: tx.amount,
          color: categoryColor,
        };
      } else {
        expenseMap[categoryName].value += tx.amount;
      }
    }
  });

  return Object.values(expenseMap);
};
