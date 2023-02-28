import { TransactionInterface } from "../common/Table/types";

export interface HomeContextInterface {
  data: TransactionInterface;
  error: ErrorTransactionForm;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenEdit: (id: string) => void;
  submit: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  transactions: TransactionInterface[];
  handleErrorChange: (error: Partial<ErrorTransactionForm>) => void;
  isEdit: boolean;
  handleDataChange: (date: Partial<TransactionInterface>) => void;
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
