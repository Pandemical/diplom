import { Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import styles from "./empty-placeholder.module.css";

interface EmptyPlaceholderProps {
  message: string;
}

function EmptyPlaceholder({ message }: EmptyPlaceholderProps) {
  return (
    <div className={styles.placeholder}>
      <IconInfoCircle size={24} color="#888" />
      <Text c="dimmed">{message}</Text>
    </div>
  );
}

export default EmptyPlaceholder;
