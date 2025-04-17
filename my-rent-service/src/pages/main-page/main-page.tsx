import { JSX } from "react";
import MoneyCard from "../../components/money-card/money-card";
import Header from "../../components/header/header";

function MainPage(): JSX.Element {
    return (
        <body>
            <Header/>
            <main>
                <div className="content">
                    <div className="container-content">
                        <div className="my-money">
                            <p>Мои финансы</p>
                            <div className="money">
                                <MoneyCard/>
                                <MoneyCard/>
                                <MoneyCard/>
                                <button className="add-money">+ Добавить счёт</button>
                            </div>
                        </div>
                        {/* флэткипр календарик переделать или что-то сделать */}
                        {/* <div className="date-range-container">
                            <p>Выберите период</p>
                            <input type="text" id="dateRangePicker" placeholder="Выберите даты" readonly>
                                <script> flatpickr("#dateRangePicker", {
                                    mode: "range",
                                    minDate: "today",
                                    dateFormat: "Y-m-d",
                            });</script>
                        </div> */}
                        <div className="content-block">
                            <div className="block">
                                <div className="block-name">
                                    <span>Структура расходов</span>
                                </div>
                                <span>В этом месяце</span>
                                <span>-200,00 ₽</span>
                                <div>Здесь должен быть график</div>
                            </div>
                            <div className="block">
                                <div className="block-name">
                                    <span>Последние транзакции</span>
                                </div>
                                <span>Перевести, снять</span>
                                <span>Еда напитки</span>
                                <span>Транспорт</span>
                                <span>Интернет</span>
                            </div>
                            <div className="block">
                                <div className="block-name">
                                    <span>Обзор</span>
                                </div>
                                <span>Наличные</span>
                                <span>Наличные</span>
                                <div>Карты</div>
                            </div>
                            <div className="block">
                                <div className="block-name">
                                    <span>Движение денежных средств</span>
                                </div>
                                <span>В этом месяце</span>
                                <span>Доход карта</span>
                                <div>Расход</div>
                            </div>
                            <div className="block">
                                <div className="block-name">
                                    <span>Сравнение по периодам</span>
                                </div>
                            </div>
                            <div className="block">
                                <div className="block-name">
                                    <span>Структура расходов</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </body >
    );
}

export default MainPage;