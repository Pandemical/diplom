import {JSX} from 'react'
import Header from '../../components/header/header';
import BillCard from '../../components/bill/bill';
import {cards} from '../../mocks/cards'

function BillsPage(): JSX.Element {
    return (
        <>
            <Header/>
            <main>
                <div className="content">
                    <div className="container-content-bills">
                        <div className="side-bar">
                            <p>Счета</p>
                            <button>+Добавить</button>
                            <input type="text" placeholder="Поиск"/>
                            <span>Сортировать по</span>
                            <select className="fillter-bills">
                                <option value="">Стандартно</option>
                                <option value="">А-Я</option>
                                <option value="">Я-А</option>
                                <option value="">Сумма по убыванию</option>
                                <option value="">Сумма по возврастанию</option>
                            </select>
                        </div>
                        <div className="main-content">
                            <div className="list-bills">
                            {cards.map((card) => (
                                <BillCard key={card.id} card={card}/>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BillsPage;