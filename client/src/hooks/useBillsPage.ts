import { useEffect, useState } from "react";
import { Bill } from "../types/bill";
import { createBill, fetchBill, updateBill } from "../api/billApi";

export function useBillsPage() {
  const [modalOpened, setModalOpened] = useState(false);
  const [cards, setCards] = useState<Bill[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editBill, setEditBill] = useState<Bill | null>(null);

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

  const handleAddBill = async (bill: Omit<Bill, "id">) => {
    try {
      const createdBill = await createBill(
        bill.title,
        bill.amount,
        bill.currency,
        bill.color,
        bill.type_bill.id
      );
      setCards((prev) => [...prev, createdBill]);
    } catch (error) {
      console.error("Ошибка при создании счёта:", error);
    }
  };

  const handleEditSave = async (bill: Bill | Omit<Bill, "id">) => {
    if ("id" in bill) {
      try {
        const updated = await updateBill(Number(bill.id), bill);
        setCards((prev) => prev.map((b) => (b.id === bill.id ? updated : b)));
        setEditBill(null);
      } catch (error) {
        console.error("Ошибка при обновлении счёта:", error);
      }
    }
  };

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((bill) => Number(bill.id) !== id));
  };

  const filtered = cards.filter((bill) =>
    bill.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBills = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "amount-desc":
        return b.amount - a.amount;
      case "amount-asc":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  return {
    modalOpened,
    setModalOpened,
    cards,
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
  };
}
