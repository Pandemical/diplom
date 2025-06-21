import {
  Modal,
  TextInput,
  Select,
  Group,
  Stack,
  Center,
  Button,
} from '@mantine/core';
import { Bill } from '../../types/bill';
import { Category } from '../../types/category';

type Props = {
  opened: boolean;
  onClose: () => void;
  amount: string;
  setAmount: (val: string) => void;
  billId: string | null;
  setBillId: (val: string | null) => void;
  category: string | null;
  setCategory: (val: string | null) => void;
  bills: Bill[];
  categories: Category[];
  onSubmit: () => void;
};

export default function AddTransactionModal({
  opened,
  onClose,
  amount,
  setAmount,
  billId,
  setBillId,
  category,
  setCategory,
  bills,
  categories,
  onSubmit,
}: Props) {
  return (
    <Modal opened={opened} onClose={onClose} title="Добавить транзакцию" centered>
      <Center>
        <Stack style={{ width: '100%' }}>
          <TextInput
            label="Сумма"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            type="number"
          />
          <Select
            label="Счёт"
            placeholder="Выберите счёт"
            data={bills.map((bill) => ({
              value: bill.id.toString(),
              label: bill.title,
            }))}
            value={billId}
            onChange={setBillId}
            searchable
          />
          <Select
            label="Категория"
            placeholder="Выберите категорию"
            data={categories.map((cat) => ({
              value: cat.id.toString(),
              label: cat.name,
            }))}
            value={category}
            onChange={setCategory}
            searchable
          />
          <Group>
            <Button onClick={onSubmit}>Сохранить</Button>
          </Group>
        </Stack>
      </Center>
    </Modal>
  );
}
