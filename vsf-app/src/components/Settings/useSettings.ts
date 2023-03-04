import { useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ErrorContext, UserContext } from "../../App";
import { UserInterface } from "../../utils/types";
import { TransactionInterface } from "../common/Table/types";
import {
  RecurrentTransactionInterface,
  SettingsContextInterface,
} from "./types";

export const useSettings = (): SettingsContextInterface => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenForgetPassword,
    onClose: onCloseForgetPassword,
    onOpen: onOpenForgetPassword,
  } = useDisclosure();
  const { user } = useContext(UserContext);
  const [userChanges, setUserChanges] = useState<UserInterface | null>(user);
  const [idRecurrentTransaction, setIdRecurrentTransaction] = useState<
    string | undefined
  >(undefined);
  const [isLoadingUserChanges, setIsLoadingUserChanges] =
    useState<boolean>(false);
  const [isLoadingPasswordChanges, setIsLoadingPasswordChanges] =
    useState<boolean>(false);
  const { createError, createToast } = useContext(ErrorContext);
  const changePassword = async () => {};
  const submitChanges = async () => {};
  const submitTransaction = async (data: TransactionInterface) => {};
  const changeUser = async (data: Partial<UserInterface>) => {};
  const [recurrentTransactions, setRecurrentTransactions] = useState<
    RecurrentTransactionInterface[]
  >([
    {
      id: "1",
      name: "Netflix",
      amount: 10,
      date: "2021-10-10",
      deposit: 20,
      type: 10,
      frequency: 10,
      isCanceled: true,
      description: "lorem ipsum  lorem ipsum       lorem  ",
    },
  ]);
  return {
    isOpen,
    onClose,
    onOpen,
    onOpenForgetPassword,
    onCloseForgetPassword,
    isOpenForgetPassword,
    isLoadingUserChanges,
    isLoadingPasswordChanges,
    changePassword,
    userChanges,
    submitChanges,
    changeUser,
    recurrentTransactions,
    submitTransaction,
    idRecurrentTransaction,
  };
};
