import {JSX} from 'react'
import {
  IconCoin,
  IconToolsKitchen2,
  IconShoppingBag,
  IconHomeDollar,
  IconBus,
  IconBuildingCarousel,
  IconDevices2,
  IconReportMoney,
  IconDots
} from '@tabler/icons-react';

 const iconMap: Record<string, JSX.Element> = {
  IconCoin: <IconCoin color="white" size={30} />,
  IconToolsKitchen2: <IconToolsKitchen2 color="white" size={30} />,
  IconShoppingBag: <IconShoppingBag color="white" size={30} />,
  IconHomeDollar: <IconHomeDollar color="white" size={30} />,
  bus: <IconBus color="white" size={30} />,
  IconBuildingCarousel: <IconBuildingCarousel color="white" size={30} />,
  IconDevices2: <IconDevices2 color="white" size={30} />,
  IconReportMoney: <IconReportMoney color="white" size={30} />,
  IconDots: <IconDots color="white" size={30} />,
};

export default iconMap