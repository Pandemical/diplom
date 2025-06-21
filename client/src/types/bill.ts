export type Bill = {
  id: string;
  title: string;
  color: string;
  type_bill: TypeBill; 
  amount: number;
  currency: string;
};

export type TypeBill = {
  id: number;
  name: string;
  img: string;
};