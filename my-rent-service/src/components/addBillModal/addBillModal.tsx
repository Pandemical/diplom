import { Bill } from '../../types/bill';
import {
  Modal,
  Button,
  TextInput,
  ColorInput,
  Select,
  NumberInput,
} from '@mantine/core';
import { useState } from 'react';

interface AddBillModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (bill: Omit<Bill, 'id'>) => void;
}

export default function AddBillModal({ opened, onClose, onSave }: AddBillModalProps) {
  const [title, setName] = useState('');
  const [color, setColor] = useState('#339af0');
  const [type, setType] = useState<number | null>(null);
  const [amount, setBalance] = useState(0);
  const [currency, setCurrency] = useState('RUB'); // <-- Используем текстовое значение

  const handleSubmit = () => {
    if (title && color && type !== null && currency) {
      try {
        onSave({
          title,
          amount,
          currency,
          color,
          type, // <-- Число type_id
        });
        onClose();
        setName('');
        setColor('#339af0');
        setType(null);
        setBalance(0);
        setCurrency('RUB');
      } catch (error) {
        console.error('Ошибка при создании счёта:', error);
      }
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Добавить счёт" centered>
      <TextInput
        label="Название счёта"
        value={title}
        onChange={(e) => setName(e.currentTarget.value)}
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
        value={type !== null ? type.toString() : null}
        onChange={(value) => setType(value ? Number(value) : null)}
        data={[
          { value: '3', label: 'Общий' },
          { value: '4', label: 'Наличные' },
          { value: '5', label: 'Текущий счёт' },
          { value: '6', label: 'Кредитная карта' },
          { value: '7', label: 'Инвестиции' },
          { value: '8', label: 'Заем' },
          { value: '9', label: 'Ипотека' },
          { value: '10', label: 'Сберегательный счёт' },
        ]}
        required
      />
      <NumberInput
        label="Сумма на счёте"
        value={amount}
        onChange={(value) => setBalance(Number(value) || 0)}
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
        Сохранить
      </Button>
    </Modal>
  );
}
