import { JSX } from "react"; 
import { Transaction } from "../../types/transaction";
import styles from './transaction-card.module.css';
import { Checkbox } from '@mantine/core';
import iconMap from '../../utils/categoryIcons';

interface TransactionProps {
  transaction: Transaction;
  checked?: boolean;
  onCheck?: (id: number, checked: boolean) => void;
  showCheckbox?: boolean; 
  showDate?: boolean;
}

function TransactionCard({ transaction, checked, onCheck, showCheckbox=true, showDate=true, className = '' }: TransactionProps & { className?: string }): JSX.Element {
  const category = transaction.category_transaction;
  const Icon = iconMap[category?.img || 'IconDots'];

  const isExpense = category?.type === 'expense';
  const isIncome = category?.type === 'income';

  const amountStyle = isExpense
    ? styles.amountExpense
    : isIncome
    ? styles.amountIncome
    : '';

  return (
    <div className={`${styles["item-transaction"]} ${className}`}>
      {showCheckbox && (
        <Checkbox
          color="green"
          checked={checked}
          onChange={(e) => onCheck?.(transaction.id, e.currentTarget.checked)}
        />
      )}


      <div
        className={styles["background-category"]}
        style={{ backgroundColor: category?.color || '#ccc' }}
      >
        {Icon}
      </div>

      <span>{category?.name}</span>
      <span>{transaction.bill?.title}</span>
      {showDate && (
          <span>{new Date(transaction.date).toLocaleDateString('ru-RU')}</span>
        )}
      <span className={amountStyle}>
        {transaction.amount.toFixed(2)} ₽
      </span>
    </div>
  );
}

export default TransactionCard;
