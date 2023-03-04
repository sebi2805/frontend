import { UserInterface } from "../../utils/types";
import { TransactionInterface } from "../common/Table/types";

export interface SettingsContextInterface {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenForgetPassword: () => void;
  onCloseForgetPassword: () => void;
  isOpenForgetPassword: boolean;
  isLoadingUserChanges: boolean;
  isLoadingPasswordChanges: boolean;
  changePassword: () => void;
  userChanges: UserInterface | null;
  submitChanges: () => void;
  changeUser: (data: Partial<UserInterface>) => void;
  submitTransaction: (data: TransactionInterface) => void;
  recurrentTransactions: RecurrentTransactionInterface[];
  idRecurrentTransaction?: string;
}
export interface RecurrentTransactionInterface {
  id: string;
  name: string;
  description?: string;
  amount: number;
  type: number;
  deposit: number;
  date: string;
  frequency: number;
  isCanceled: boolean;
}
