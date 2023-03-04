export type RecordType = Record<number, string>;

export const TransactionType: RecordType = {
  20: "Expense",
  10: "Income",
};
export const DepositType: RecordType = {
  10: "Bank",
  20: "Cash",
};
export const FrequencyType: RecordType = {
  10: "Daily",
  20: "Weekly",
  30: "Monthly",
  40: "Yearly",
};
export interface TransactionInterface {
  id?: string;
  name: string;
  description?: string;
  amount: string;
  type: number;
  deposit: number;
  currentAmountBank: string;
  currentAmountCash: string;
  date: string;
  frequency?: number;
  startDate?: string;
  isRecurent?: boolean;
}
export const object: TransactionInterface[] = [
  {
    id: "1",
    name: "test",
    description: "test",
    amount: "100",
    type: 10,
    deposit: 10,
    currentAmountBank: "100",
    currentAmountCash: "0",
    date: "2021-01-01",
  },
  {
    id: "2",
    name: "test",
    amount: "100",
    type: 20,
    deposit: 10,

    description: "test",
    currentAmountBank: "200",
    currentAmountCash: "0",
    date: "2021-01-02",
  },
  {
    name: "test",
    description: "test",
    id: "3",
    amount: "100",
    type: 10,
    deposit: 20,
    currentAmountBank: "300",
    currentAmountCash: "0",
    date: "2021-01-03",
  },
];
