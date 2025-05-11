export type Transaction = {
    id: number;
    amount: number;
    date: Date;
    billId: number;
    categoryId: number;
    category_transaction: TransactionCategory;
    bill: Billtransaction;
}

type TransactionCategory = {
    id: number,
    name: string,
    img: string,
    color: string,
    type: string,
}

type Billtransaction = {
    id: number,
    title: string,
    userId: number
}