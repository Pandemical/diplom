import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app'

import { MantineProvider } from '@mantine/core';
import {theme} from './theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App/>
    </MantineProvider>
  </React.StrictMode>
)
