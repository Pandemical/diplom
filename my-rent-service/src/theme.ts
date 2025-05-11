import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    deepBlue: [
      "#ebfff1",
      "#d4fee2",
      "#a4fdc1",
      "#72fd9d",
      "#4efd80",
      "#3dfd6d",
      "#34fe63",
      "#29e252",
      "#1dc948",
      "#00571d",
    ],
  },
  components: {
    DonutChart: {
      defaultProps: {
        size: 250,
        thickness: 30,
        paddingAngle: 5,
        withLabels: false,
        withTooltip: true,
        chartLabel: 'Расходы',
      },
    },
    MonthPickerInput: {
      defaultProps: {
        clearable: true,
        defaultValue: new Date(),
        size: 'md', // Размер элементов управления ('xs'|'sm'|'md'|'lg'|'xl')
        mx: 'auto', // Автоматические отступы по горизонтали для центрирования
        style: {
          maxWidth: '400px', // Фиксированная максимальная ширина
          width: '100%', // Занимает всю доступную ширину (до maxWidth)
        },
      },
      styles: () => ({
        root: {
          width: '100%',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxSizing: 'border-box',
        },
        wrapper: {
          width: '100%',
          maxWidth: '400px',
        },
        input: {
          width: '100%',
          textAlign: 'center', // Центрирование текста
          paddingRight: '2.5rem',
        },
        dropdown: {
          width: '400px !important', // Ширина выпадающего меню
          maxWidth: '100%',
        },
        section: {
          // это блок справа, содержащий иконки
          right: '0.5rem',
        },
      }),
    },
    LineChart: {
      defaultProps: {
        h: 300,
        w: 440,
        curveType: 'linear',
      },
    }
  },

});
