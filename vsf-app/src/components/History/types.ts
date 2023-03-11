import { TransactionInterface } from "../common/Table/types";

export interface HistoryContextInterface {
  transactions: TransactionInterface[];
  submit: (data: TransactionInterface) => void;
  id: string | undefined;
  isLoading: boolean;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  getData: () => void;
  isLoadingMore: boolean;
  setId: (id: string | undefined) => void;
}
