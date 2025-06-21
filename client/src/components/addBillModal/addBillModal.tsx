import { Bill, TypeBill } from '../../types/bill'; // Не забудь импортировать TypeBill
import {
  Modal,
  Button,
  TextInput,
  ColorInput,
  Select,
  NumberInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';

interface AddBillModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (bill: Omit<Bill, 'id'> | Bill) => void;
  initialData?: Bill | null;
}

// 🔁 Имитация списка типов счёта — в будущем это лучше вынести в constants.ts или загружать с API
const TYPE_BILL_OPTIONS: TypeBill[] = [
  { id: 3, name: 'Общий', img: '' },
  { id: 4, name: 'Наличные', img: '' },
  { id: 5, name: 'Текущий счёт', img: '' },
  { id: 6, name: 'Кредитная карта', img: '' },
  { id: 7, name: 'Инвестиции', img: '' },
  { id: 8, name: 'Заем', img: '' },
  { id: 9, name: 'Ипотека', img: '' },
  { id: 10, name: 'Сберегательный счёт', img: '' },
];

export default function AddBillModal({ opened, onClose, onSave, initialData }: AddBillModalProps) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#339af0');
  const [typeBillId, setTypeBillId] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('RUB');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setColor(initialData.color);
      setTypeBillId(initialData.type_bill.id); // 💡 Используем только ID
      setAmount(initialData.amount);
      setCurrency(initialData.currency);
    } else {
      resetForm();
    }
  }, [initialData, opened]);

  const resetForm = () => {
    setTitle('');
    setColor('#339af0');
    setTypeBillId(null);
    setAmount(0);
    setCurrency('RUB');
  };

  const handleSubmit = () => {
    if (title && color && typeBillId !== null && currency) {
      const selectedType = TYPE_BILL_OPTIONS.find(t => t.id === typeBillId);
      if (!selectedType) {
        console.error('Не удалось найти тип счёта по ID');
        return;
      }

      const bill: Omit<Bill, 'id'> = {
        title,
        amount,
        currency,
        color,
        type_bill: selectedType, // 🟢 Передаём весь объект TypeBill
      };

      if (initialData?.id) {
        onSave({ ...bill, id: initialData.id });
      } else {
        onSave(bill);
      }

      onClose();
      resetForm();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={initialData ? 'Изменить счёт' : 'Добавить счёт'} centered>
      <TextInput
        label="Название счёта"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        required
      />
      <ColorInput
        label="Цвет карточки"
        value={color}
        onChange={setColor}
        required
      />
      <Select
        label="Тип счёта"
        placeholder="Выберите тип"
        value={typeBillId !== null ? String(typeBillId) : null}
        onChange={(value) => setTypeBillId(value ? Number(value) : null)}
        data={TYPE_BILL_OPTIONS.map(type => ({
          value: String(type.id),
          label: type.name,
        }))}
        required
      />
      <NumberInput
        label="Сумма на счёте"
        value={amount}
        onChange={(value) => setAmount(Number(value) || 0)}
        min={0}
      />
      <Select
        label="Валюта"
        placeholder="Выберите валюту"
        value={currency}
        onChange={(value) => value && setCurrency(value)}
        data={[
          { value: '₽', label: '₽ Рубли' },
          { value: '$', label: '$ Доллары' },
          { value: '€', label: '€ Евро' },
        ]}
        required
      />
      <Button fullWidth mt="md" onClick={handleSubmit}>
        {initialData ? 'Сохранить изменения' : 'Сохранить'}
      </Button>
    </Modal>
  );
}
