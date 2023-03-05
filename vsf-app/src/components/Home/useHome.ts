import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { TransactionInterface } from "../common/Table/types";
import { HomeContextInterface } from "./types";

export const useHome = (): HomeContextInterface => {
  const {
    isOpen: isOpenInitializeModal,
    onClose: onCloseInitializeModal,
    onOpen: onOpenInitializeModal,
  } = useDisclosure();
  const { createError, createToast } = useContext(ErrorContext);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  const [id, setId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const submit = async (data: TransactionInterface) => {
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
              setTransactions(
                [...transactions, res.data].sort((a, b) =>
                  moment(a.date, "DD/MM/YYYY").diff(
                    moment(b.date, "DD/MM/YYYY")
                  )
                )
              );
            })
            .catch((err) => {
              createError(err.response.data);
            });
    }
  };

  const getData = async () => {
    await apiClient
      .get("/api/Transaction/get-last-month-transactions", authorise())
      .then((res) => {
        setTransactions(res.data);
        createToast("Welcome");
      })
      .catch((err) => {
        createError(err.response.data);
      });
    setIsLoading(false);
  };
  const handleEdit = (id: string) => {
    setId(id);
  };
  const handleDelete = async (id: string) => {
    await apiClient
      .delete(`/api/Transaction/delete-transaction?id=${id}`, authorise())
      .then((res) => {
        createToast("Transaction deleted");
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
    id,
    handleDelete,
    handleEdit,
    isLoading,
    submit,
    transactions,
    isOpenInitializeModal,
    onCloseInitializeModal,
    onOpenInitializeModal,
  };
};
