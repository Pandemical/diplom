import { JSX } from "react";
import { Bill } from "../../types/bill";
import styles from "./bill.module.css";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import iconMap from "../../utils/billIcons";
import { Menu, ActionIcon } from "@mantine/core";
import { deleteBill } from '../../api/billApi';

interface BillProps {
  bill: Bill;
  onDelete: (id: number) => void; // 👈 новый пропс
}

function BillCard({ bill, onDelete }: BillProps): JSX.Element {
  const icon = iconMap[bill.type_bill?.name || "default"];

  const handleDelete = async () => {
    try {
      await deleteBill(bill.id);
      onDelete(Number(bill.id));
    } catch (e) {
      console.error("Ошибка при удалении счёта:", e);
    }
  };

  return (
    <div className={styles["item-bill"]}>
      <div
        className={styles["background-logo"]}
        style={{ backgroundColor: bill.color }}
      >
        {icon}
      </div>

      <span>{bill.title}</span>
      <span>{bill.type_bill?.name ?? "—"}</span>
      <span>{bill.amount}{bill.currency}</span>

      <Menu shadow="md" width={150} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="subtle">
            <IconDotsVertical style={{ color: "black" }} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => console.log("Редактировать", bill.id)}>
            <IconEdit size={16} style={{ marginRight: 8 }} />
            Изменить
          </Menu.Item>
          <Menu.Item color="red" onClick={handleDelete}>
            <IconTrash size={16} style={{ marginRight: 8 }} />
            Удалить
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default BillCard;
