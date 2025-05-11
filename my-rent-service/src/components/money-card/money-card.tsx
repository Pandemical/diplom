import { JSX } from 'react';
import { Bill } from "../../types/bill";
import styles from './money-card.module.css';
import iconMap from '../../utils/billIcons';

interface BillProps {
    bill: Bill;
}

function MoneyCard({ bill }: BillProps): JSX.Element {
    const icon = iconMap[bill.type_bill?.name || "default"];

    return (
        <div className={styles["money-cards"]} style={{ backgroundColor: bill.color }}>
            <div className="background-logo-money">
                {icon}
            </div>
            <p className="card-info">
                <span className="card-title">{bill.title}</span><br />
                <span className="card-amount">{bill.currency}{bill.amount}</span>
            </p>
        </div>
    );
}

export default MoneyCard;