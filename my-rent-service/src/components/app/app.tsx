import {JSX} from 'react'
import MainPage from "../../pages/main-page/main-page";
import { AppRoute, AuthorizationStatus } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnaliticksPage from '../../pages/analiticks-page/analiticks-page';
import BillsPage from '../../pages/bills-page/bills-page';
import SettingsPage from '../../pages/settings-page/settings-page';
import LoginPage from '../../pages/login-page/login-page';
import ReagistrationPage from '../../pages/registration-page/registration-page';
import { PrivateRoute } from '../private-route/private-route';
import TransactionPage from '../../pages/transaction-page/transaction-page';


function App(): JSX.Element {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Main} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><MainPage/></PrivateRoute> } />
                <Route path={AppRoute.Analiticks} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><AnaliticksPage/></PrivateRoute>} />
                <Route path={AppRoute.Bills} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><BillsPage/></PrivateRoute>} />
                <Route path={AppRoute.Transaction} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><TransactionPage/></PrivateRoute>} />
                <Route path={AppRoute.Settings} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><SettingsPage/></PrivateRoute>} />
                <Route path={AppRoute.Login} element={<LoginPage/>}/>
                <Route path={AppRoute.Registration} element={<ReagistrationPage/>} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;