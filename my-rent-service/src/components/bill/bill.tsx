import { JSX } from "react";
import { CardMoney } from "../../types/card";
import styles from './bill.module.css'

interface MoneyCardProps {
    card: CardMoney;
}


function BillCard({card}:MoneyCardProps): JSX.Element {
    return(
        <div className={styles["item-bill"]}>
            <div className="background-logo " style={{ backgroundColor: card.backroungcolor }}>
                <img src={card.imageicon} alt={card.title}/>
            </div>
            <span>{card.title}(title)</span>
            <span>{card.type}(type)</span>
            <span>97 543,00 ₽</span>
        </div>
    )
}

export default BillCard;