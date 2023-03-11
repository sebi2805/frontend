import moment from "moment";
import { useContext, useEffect, useMemo, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { TransactionInterface } from "../common/Table/types";
import { HistoryContextInterface } from "./types";

export const useHistory = (): HistoryContextInterface => {
  const { createToast, createError } = useContext(ErrorContext);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const take = useMemo(() => 15, []);
  const [id, setId] = useState<string | undefined>(undefined);
  const getData = async () => {
    setIsLoadingMore(true);

    setSkip(skip + 15);
    await apiClient
      .get(
        `/api/UserHistory/get-history?skip=${skip}&take=${take}`,
        authorise()
      )
      .then((res) => {
        setTransactions([...transactions, ...res.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        createError(err.response.data);
        setIsLoading(false);
      });
    setIsLoadingMore(false);
  };
  const submit = async (data: TransactionInterface) => {
    if (id) {
      await apiClient
        .put(`/api/Transaction/update-transaction?id=${id}`, data, authorise())
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
                  ) >= 0
                    ? -1
                    : 1
                )
              );
            })
            .catch((err) => {
              createError(err.response.data);
            });
    }
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
    getData,
    transactions,
    submit,
    isLoadingMore,
    id,
    isLoading,
    handleEdit,
    handleDelete,
    setId,
  };
};
