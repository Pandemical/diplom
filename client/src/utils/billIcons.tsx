import { JSX } from "react";
import {
  IconWallet,
  IconCreditCard,
  IconPigMoney,
  IconCoins,
  IconBuildingBank,
  IconBusinessplan,
  IconMoneybag,
  IconCalendar,
} from "@tabler/icons-react";

const iconMap: Record<string, JSX.Element> = {
  "Общий": <IconWallet color="white" size={30} />,
  "Кредитная карта": <IconCreditCard color="white" size={30} />,
  "Наличные": <IconBuildingBank color="white" size={30} />,
  "Текущий счет": <IconPigMoney color="white" size={30} />,
  "Инвестиции": <IconBusinessplan color="white" size={30} />,
  "Заем": <IconMoneybag color="white" size={30} />,
  "Ипотека": <IconCalendar color="white" size={30} />,
  "Сберегательный счет": <IconCoins color="white" size={30} />,
};

export default iconMap;