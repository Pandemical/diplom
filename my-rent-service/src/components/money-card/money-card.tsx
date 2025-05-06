import {JSX} from 'react';
import { Bill } from "../../types/bill";
import styles from './money-card.module.css'

interface BillProps {
    bill: Bill;
}

function MoneyCard({ bill: bill }: BillProps): JSX.Element {
    return (
        <div className={styles["money-cards"]} style={{ backgroundColor: bill.color }}>
            <div className="background-logo-money">
                <img 
                    src={'/default'} 
                />
            </div>
            <p className="card-info">
                <span className="card-title">{bill.title}</span><br/>
                <span className="card-amount">{bill.currency}{bill.amount}</span>
            </p>
        </div>
    );
}

export default MoneyCard;