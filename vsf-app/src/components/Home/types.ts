import { TransactionInterface } from "../common/Table/types";

export interface HomeContextInterface {
  submit: (data: TransactionInterface) => void;
  id: string | undefined;
  onOpenEdit: (id: string) => void;
  transactions: TransactionInterface[];
  isOpenInitializeModal: boolean;
  onOpenInitializeModal: () => void;
  onCloseInitializeModal: () => void;
}

export interface ErrorTransactionForm {
  name: string;
  amount?: string;
  type?: string;
  deposit?: string;
  date?: string;
  frequency?: string;
  description?: string;
  isRecurent?: string;
  [key: string]: string | undefined;
}
