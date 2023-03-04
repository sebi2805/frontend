import { UserInterface } from "../../utils/types";
import { TransactionInterface } from "../common/Table/types";
import { UserModalInterface } from "./UserModal/useUserModal";

export interface SettingsContextInterface {
  submitPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  submitUser: (data: UserModalInterface) => void;
  submitTransaction: () => void;
  recurrentTransactions: RecurrentTransactionInterface[];
  idRecurrentTransaction?: string;
  deleteUser: () => void;
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
