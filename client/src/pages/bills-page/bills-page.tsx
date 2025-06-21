import { JSX } from "react";
import Header from "../../components/header/header";
import BillCard from "../../components/bill/bill";
import AddBillModal from "../../components/addBillModal/addBillModal";
import styles from "./bill-page.module.css";
import { useBillsPage } from "../../hooks/useBillsPage";

function BillsPage(): JSX.Element {
  const {
    modalOpened,
    setModalOpened,
    search,
    setSearch,
    sortBy,
    setSortBy,
    editBill,
    setEditBill,
    sortedBills,
    handleAddBill,
    handleEditSave,
    handleDelete,
  } = useBillsPage();

  return (
    <>
      <Header />
      <main>
        <div className="content">
          <div className="container-content-bills">
            <div className={styles["side-bar"]}>
              <p>Счета</p>
              <button onClick={() => setModalOpened(true)}>+ Добавить</button>
              <input
                type="text"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span>Сортировать по</span>
              <select
                className={styles["fillter-bills"]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Стандартно</option>
                <option value="az">А-Я</option>
                <option value="za">Я-А</option>
                <option value="amount-desc">Сумма по убыванию</option>
                <option value="amount-asc">Сумма по возрастанию</option>
              </select>
            </div>
            <div className="main-content">
              <div className="list-bills">
                {sortedBills.map((bill) => (
                  <BillCard
                    key={bill.id}
                    bill={bill}
                    onDelete={handleDelete}
                    onEdit={() => setEditBill(bill)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <AddBillModal
        opened={modalOpened || Boolean(editBill)}
        onClose={() => {
          setModalOpened(false);
          setEditBill(null);
        }}
        onSave={modalOpened ? handleAddBill : handleEditSave}
        initialData={editBill || undefined}
      />
    </>
  );
}

export default BillsPage;