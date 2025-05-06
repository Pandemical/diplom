import {JSX} from 'react'
import Header from '../../components/header/header'
import Transaction from '../../components/transaction/transaction';
import { transactions } from '../../mocks/transactions';

function TransactionPage(): JSX.Element{
    return(
        <>
            <Header/>
            <main>
                <div className="content">
                    <div className="container-content-bills">
                        <div className="side-bar">
                            <p>Транзакции</p>
                            <button>+ Добавить</button>
                            <input type="text" placeholder="Поиск"/>
                            <span>Фильтры</span>
                            <div className="accordion">
                                <div className="category">
                                    <button className="accordion-btn">Категории</button>
                                    <div className="subcategories">
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="all" checked/> Все категории
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="food"/> Еда и напитки
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="shopping"/> Покупки
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="housing"/> Жилье
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="transport"/> Транспорт
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="entertainment"/> Развлечения и досуг
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="communication"/> Связь, ПК
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="expenses"/> Финансовые расходы
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="investments"/> Инвестиции
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="income"/> Доход
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="other"/> Прочее
                                        </label>
                                    </div>
                                    <button className="accordion-btn">Тип транзакции</button>
                                    <div className="subcategories">
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="all" checked/> Все транзакции
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="Income"/> Доход
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="Consumption"/> Расход
                                        </label>
                                        <label className="category-checkbox">
                                            <input type="checkbox" name="category" value="Transfer"/> Перевод
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-content">
                            <div className="list-bills"> 
                                <div className="change-list-transaction">
                                    <button className="choose-all-transaction">Выбрать все</button>
                                    <button className="delete-transaction">Удалить</button>
                                </div>
                                {
                                    transactions.map((TransactionCard) => (
                                        <Transaction key={TransactionCard.id} transaction={TransactionCard}/>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    </div>
            </main>
        </>
    )
}

export default TransactionPage;