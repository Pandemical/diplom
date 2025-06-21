import { useEffect, useState } from "react";
import { Bill } from "../types/bill";
import { Transaction } from "../types/transaction";
import { Recommendation } from "../types/recomendation";
import { fetchRecommendations } from "../api/predictionApi";
import { createBill, fetchBill } from "../api/billApi";
import { fetchTransaction } from "../api/transactionApi";

export const useMainPage = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [cards, setCards] = useState<Bill[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleAddBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      const createdBill = await createBill(
        bill.title,
        bill.amount,
        bill.currency,
        bill.color,
        Number(bill.type_bill)
      );
      setCards((prev) => [...prev, createdBill]);
    } catch (error) {
      console.error("Ошибка при создании счёта:", error);
    }
  };

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await fetchRecommendations();
        setRecommendations(recs);
      } catch (error) {
        console.error("Ошибка загрузки рекомендаций:", error);
      }
    };
    loadRecommendations();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bills, txs] = await Promise.all([
          fetchBill(),
          fetchTransaction()
        ]);
        setCards(bills);
        setTransactions(txs);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadData();
  }, []);

  return {
    modalOpened,
    setModalOpened,
    cards,
    transactions,
    selectedMonth,
    setSelectedMonth,
    recommendations,
    handleAddBill
  };
};
