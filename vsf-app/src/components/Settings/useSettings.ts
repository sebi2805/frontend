import { useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext, UserContext } from "../../App";
import { UserInterface } from "../../utils/types";
import { TransactionInterface } from "../common/Table/types";
import {
  RecurrentTransactionInterface,
  SettingsContextInterface,
} from "./types";
import { UserModalInterface } from "./UserModal/useUserModal";

export const useSettings = (): SettingsContextInterface => {
  const { logout } = useContext(UserContext);

  const [idRecurrentTransaction, setIdRecurrentTransaction] = useState<
    string | undefined
  >(undefined);

  const { createError, createToast } = useContext(ErrorContext);
  const getData = async () => {};
  const submitPassword = async (oldPassword: string, newPassword: string) => {
    await apiClient
      .put(
        `/api/Users/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`,
        {},
        authorise()
      )
      .then(() => {
        createToast("Password changed!");
      })
      .catch((err) => {
        createError(err.data);
      });
  };
  const submitUser = async (data: UserModalInterface) => {
    await apiClient
      .put("/api/Users/update-user", data, authorise())
      .then((res) => {
        createToast("Changes saved!");
      })
      .catch((err) => {
        createError(err.data);
      });
  };
  const submitTransaction = async () => {
    getData();
  };
  const deleteUser = async () => {
    await apiClient
      .delete("/api/Users/delete-user", authorise())
      .then((res) => {
        logout();
      })
      .catch((err) => {
        createError(err.data);
      });
  };

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
    submitPassword,
    submitUser,
    recurrentTransactions,
    submitTransaction,
    idRecurrentTransaction,
    deleteUser,
  };
};
