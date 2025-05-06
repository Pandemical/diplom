import { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import AnaliticksPage from '../../pages/analiticks-page/analiticks-page';
import BillsPage from '../../pages/bills-page/bills-page';
import SettingsPage from '../../pages/settings-page/settings-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import TransactionPage from '../../pages/transaction-page/transaction-page';

import { AppRoute } from '../../const';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Registration} element={<RegistrationPage />} />

        <Route
          path={AppRoute.Main}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Analiticks}
          element={
            <ProtectedRoute>
              <AnaliticksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Bills}
          element={
            <ProtectedRoute>
              <BillsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Transaction}
          element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.Settings}
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;