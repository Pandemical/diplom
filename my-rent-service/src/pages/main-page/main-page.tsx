import { JSX, useEffect, useState } from "react";
import MoneyCard from "../../components/money-card/money-card";
import Header from "../../components/header/header";
import AddBillModal from "../../components/addBillModal/addBillModal";
import { DonutChart, LineChart } from "@mantine/charts";
import { MonthPickerInput } from "@mantine/dates";
import { Bill } from "../../types/bill";
import { createBill, fetchBill } from "../../api/billApi";

import '@mantine/core/styles.css';
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import styles from './main-page.module.css';
import { data, data2 } from "../../const";

function MainPage(): JSX.Element {
  const [modalOpened, setModalOpened] = useState(false);
  const [cards, setCards] = useState<Bill[]>([]);

  const handleAddBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      const createdBill = await createBill(
        bill.title,
        bill.amount,
        bill.currency,
        bill.color,
        bill.type
      );
      setCards((prev) => [...prev, createdBill]);
    } catch (error) {
      console.error("Ошибка при создании счёта:", error);
    }
  };;
  

  useEffect(() => {
    const loadBills = async () => {
      try {
        const bills = await fetchBill();
        setCards(bills);
      } catch (error) {
        console.error("Ошибка загрузки счетов:", error);
      }
    };
    loadBills();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content">
            <div className="my-money">
              <p>Мои финансы</p>
              <div className={styles.money}>
                {cards.map((bill) => (
                  <MoneyCard key={bill.id} bill={bill} />
                ))}
                <button className="add-money" onClick={() => setModalOpened(true)}>+ Добавить счёт</button>
              </div>
            </div>

            <div className="MonthPicker">
              <MonthPickerInput placeholder="Выберите месяц" label="Период" />
            </div>

            <div className={styles["content-block"]}>
              <div className={styles.block}>
                <div className="block-name">
                  <span>Структура расходов</span>
                </div>
                <span>В этом месяце</span>
                <span>-200,00 ₽</span>
                <div className={styles["chart-container"]}>
                  <DonutChart data={data} />
                </div>
              </div>

              <div className={styles.block}>
                <div className="block-name">
                  <span>Последние транзакции</span>
                </div>
                <span>Перевести, снять</span>
                <span>Еда напитки</span>
                <span>Транспорт</span>
                <span>Интернет</span>
              </div>

              <div className={styles.block}>
                <div className="block-name">
                  <span>Обзор</span>
                </div>
                <span>Наличные</span>
                <span>Наличные</span>
                <div>Карты</div>
              </div>

              <div className={styles.block}>
                <div className="block-name">
                  <span>Движение денежных средств</span>
                </div>
                <span>В этом месяце</span>
                <span>Доход карта</span>
                <div>Расход</div>
              </div>

              <div className={styles.block}>
                <div className="block-name">
                  <span>Сравнение по периодам</span>
                </div>
                <div className="Area-chart">
                  <LineChart
                    data={data2}
                    dataKey="date"
                    series={[
                      { name: 'Apples', color: 'indigo.6' },
                      { name: 'Oranges', color: 'blue.6' },
                      { name: 'Tomatoes', color: 'teal.6' },
                    ]}
                  />
                </div>
              </div>

              <div className={styles.block}>
                <div className="block-name">
                  <span>Структура расходов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddBillModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSave={handleAddBill}
      />
    </>
  );
}

export default MainPage;
