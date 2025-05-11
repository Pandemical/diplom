import { JSX, useEffect, useState } from 'react';
import Header from '../../components/header/header';
import BillCard from '../../components/bill/bill';
import { createBill,fetchBill} from '../../api/billApi';
import { Bill } from '../../types/bill';
import AddBillModal from "../../components/addBillModal/addBillModal";
import styles from './bill-page.module.css';

function BillsPage(): JSX.Element {
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
  };
  
  const handleDelete = (id: number) => {
    setCards(prev => prev.filter(bill => Number(bill.id) !== id));
  };

  useEffect(() => {
    const loadBills = async () => {
      try {
        const bills = await fetchBill();
        setCards(bills);
      } catch (error) {
        console.error('Ошибка загрузки счетов:', error);
      }
    };

    loadBills();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <div className={styles["side-bar"]}>
              <p>Счета</p>
              <button onClick={() => setModalOpened(true)}>+ Добавить</button>
              <input type="text" placeholder="Поиск" />
              <span>Сортировать по</span>
              <select className={styles["fillter-bills"]}>
                <option value="">Стандартно</option>
                <option value="">А-Я</option>
                <option value="">Я-А</option>
                <option value="">Сумма по убыванию</option>
                <option value="">Сумма по возврастанию</option>
              </select>
            </div>
            <div className="main-content">
              <div className="list-bills">
                {cards.map((bill) => (
                   <BillCard key={bill.id} bill={bill} onDelete={handleDelete} />
                ))}
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

export default BillsPage;