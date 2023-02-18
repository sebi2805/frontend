export type RecordType = Record<number, string>;

export const TransactionType: RecordType = {
  20: "Expense",
  10: "Income",
};
export const DepositType: RecordType = {
  10: "Bank",
  20: "Cash",
};
export interface TransactionInterface {
  id: string;
  amount: number;
  type: number;
  deposit: number;
  currentAmountBank: number;
  currentAmountCash: number;
  date: string;
}
export const object: TransactionInterface[] = [
  {
    id: "1",
    amount: 100,
    type: 10,
    deposit: 10,
    currentAmountBank: 100,
    currentAmountCash: 0,
    date: "2021-01-01",
  },
  {
    id: "2",
    amount: 100,
    type: 20,
    deposit: 10,

    currentAmountBank: 200,
    currentAmountCash: 0,
    date: "2021-01-02",
  },
  {
    id: "3",
    amount: 100,
    type: 10,
    deposit: 20,
    currentAmountBank: 300,
    currentAmountCash: 0,
    date: "2021-01-03",
  },
];
