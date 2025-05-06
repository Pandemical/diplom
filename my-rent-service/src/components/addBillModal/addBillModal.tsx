
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
    export default function AddBillModal({ opened, onClose,onSave  }: AddBillModalProps) {
      const [title, setName] = useState('');
      const [color, setColor] = useState('#339af0');
      const [type, setType] = useState<string | null>(null);
      const [amount, setBalance] = useState(0);
      const [currency, setCurrency] = useState('RUB');
    
      const handleSubmit = async () => {
        if (title && color && type && currency) {
          try {
            onSave({
              title,
              amount,
              currency,
              color,
              type,
            }); 
            onClose();
            setName('');
            setColor('#339af0');
            setType(null);
            setBalance(0);
            setCurrency('₽');
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
            value={type}
            onChange={(value) => value && setType(value)}
            data={[
              'Общий', 'Наличные', 'Текущий счёт', 'Кредитная карта',
              'Инвестиции', 'Заем', 'Ипотека', 'Сберегательный счёт',
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
    