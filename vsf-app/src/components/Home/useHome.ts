import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { isEmpty } from "../../utils/helpers";
import { TransactionInterface } from "../common/Table/types";
import { TransactionFormId } from "../common/VSFTransactionModal/VSFTransactionModal";
import { ErrorTransactionForm, HomeContextInterface } from "./types";

export const useHome = (): HomeContextInterface => {
  const {
    isOpen: isOpenInitializeModal,
    onClose: onCloseInitializeModal,
    onOpen: onOpenInitializeModal,
  } = useDisclosure();
  const { createError, createToast } = useContext(ErrorContext);

  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async (data: TransactionInterface) => {
    setIsSubmitting(true);

    if (isEdit) {
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
    setIsSubmitting(false);
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
  const onOpenEdit = (id: string) => {};
  useEffect(() => {
    getData();
  }, []);

  return {
    id,
    onOpenEdit,
    submit,
    transactions,
    isOpenInitializeModal,
    onCloseInitializeModal,
    onOpenInitializeModal,
  };
};
