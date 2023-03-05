import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext, UserContext } from "../../App";
import { TransactionInterface } from "../common/Table/types";
import {
  RecurrentTransactionInterface,
  SettingsContextInterface,
} from "./types";
import { UserModalInterface } from "./UserModal/useUserModal";

export const useSettings = (): SettingsContextInterface => {
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
  const { logout } = useContext(UserContext);

  const [id, setId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { createError, createToast } = useContext(ErrorContext);
  const getData = async () => {
    await apiClient
      .get("/api/Transaction/get-users-recurrent-transactions", authorise())
      .then((res) => {
        setRecurrentTransactions(res.data);
      })
      .catch((err) => {
        createError(err.data);
      });
    setIsLoading(false);
  };
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
  const submitTransaction = async (data: TransactionInterface) => {
    if (id) {
      await apiClient
        .put(`/transactions/${id}`, data, authorise())
        .then((res) => {
          createToast("Transaction updated");
          getData();
        })
        .catch((err) => {
          createError(err.response.data);
        });
    } else {
      data.isRecurent
        ? await apiClient
            .post(
              "/api/Transaction/create-recurrent-transaction",
              data,
              authorise()
            )
            .then((res) => {
              createToast("Recurrent transaction created");
            })
            .catch((err) => {
              createError(err.response.data);
            })
        : await apiClient
            .post("/api/Transaction/create-transaction", data, authorise())
            .then((res) => {
              createToast("Transaction created");
            })
            .catch((err) => {
              createError(err.response.data);
            });
    }
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
  const handleEdit = (id: string) => {
    setId(id);
  };
  const handleDelete = async (id: string) => {
    await apiClient
      .delete(
        `/api/Transaction/delete-recurrent-transaction?id=${id}`,
        authorise()
      )
      .then((res) => {
        createToast("Recurrent transaction deleted");
        getData();
      })
      .catch((err) => {
        createError(err.response.data);
      });
  };
  const handleToggle = async (id: string) => {
    await apiClient
      .put(
        `/api/Transaction/toggle-recurrent-transaction?id=${id}`,
        {},
        authorise()
      )
      .then((res) => {
        createToast("Recurrent transaction toggled");
        getData();
      })
      .catch((err) => {
        createError(err.response.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return {
    handleToggle,
    isLoading,
    submitPassword,
    submitUser,
    recurrentTransactions,
    submitTransaction,
    id,
    handleEdit,
    handleDelete,
    deleteUser,
  };
};
