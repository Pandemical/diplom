const  AppRoute = {
    Main: '/',
    Login: '/login',
    Registration: '/registration',
    Analiticks: '/analiticks',
    Bills: '/bills',
    Transaction: '/transaction',
    Settings: '/settings',
} as const;

const AuthorizationStatus = {
    Auth: 'AUTH',
    NoAuth: 'NO_AUTH',
    Unknown: 'UNKNOWN',
}

export {AppRoute,AuthorizationStatus}