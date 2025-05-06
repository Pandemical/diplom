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

export const data = [
    { name: 'USA', value: 400, color: 'blue' },
    { name: 'India', value: 300, color: 'red' },
    { name: 'Japan', value: 100, color: 'green' },
    { name: 'Other', value: 200, color: 'yellow' },
  ];
  export const data2 = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

export {AppRoute,AuthorizationStatus}