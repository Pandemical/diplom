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
        size: 'md', 
        mx: 'auto', 
        style: {
          maxWidth: '400px', 
          width: '100%',
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
          textAlign: 'center',
          paddingRight: '2.5rem',
        },
        dropdown: {
          width: '400px !important',
          maxWidth: '100%',
        },
        section: {
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
    },
    Select: {
      styles: () => ({
      root: {
        width: '100%',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box',
      },})
    }
  },

});
