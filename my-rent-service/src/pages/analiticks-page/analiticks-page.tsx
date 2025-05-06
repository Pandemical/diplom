import {JSX} from 'react'
import Header from '../../components/header/header';
import styles from './analiticks-page.module.css';

function AnaliticksPage(): JSX.Element {
    return(
    <>
            <Header/>
        <main>
            <div className="content">
                <div className="container-content-bills">
                    <div className="side-bar">
                        <p>Аналитика</p>
                        <span>Фильтры</span>
                        <div className="accordion">
                            <div className="category">
                                <button className="accordion-btn">Счета</button>
                                <div className="subcategories">
                                    <label className="category-checkbox">
                                        <input type="checkbox" name="category" value="all" checked/> Все счета
                                    </label>
                                    <label className="category-checkbox">
                                        <input type="checkbox" name="category" value="food"/> Наличные
                                    </label>
                                    <label className="category-checkbox">
                                        <input type="checkbox" name="category" value="shopping"/> Карты
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["main-content"]}>
                        <div className={styles["income-statement"]}>
                            <h2>Отчет о доходах и расходах</h2>
                            <div className={styles["income-expense"]}>
                            <div className={styles["income"]}>
                                <div className={styles["sum-income"]}><strong>Суммарные доходы: 0,00 ₽</strong></div>
                                <div className={styles["list-income"]}>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/coins.png" alt=""/></div>Доход: 0,00 ₽</div>
                                </div>
                            </div>
                            <div className={styles["expense"]}>
                                <div className={styles["sum-expense"]}><strong>Суммарные расходы: 0,00 ₽</strong></div>
                                <div className={styles["list-expense"]}>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/fork-knife.png" alt=""/></div>Еда и напитки 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/shopping-bag.png" alt=""/></div>Покупки: 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/house.png" alt=""/></div>Жилье 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/bus.png" alt=""/></div>Транспорт: 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/entertainment.png" alt=""/></div>Развлечения и досуг 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/pc.png" alt=""/></div>Связь, ПК 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/finance.png" alt=""/></div>Финансовые расходы 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/investment.png" alt=""/></div>Инвестиции 0,00 ₽</div>
                                <div className={styles["item-expense"]}><div className="background-logo"><img src="image/line3.png" alt=""/></div>Прочее 0,00 ₽</div>
                                </div>
                            </div>
                            </div>
                        </div>           
                    </div>
                </div>
            </div>
        </main>
    </>
    )
}

export default AnaliticksPage;