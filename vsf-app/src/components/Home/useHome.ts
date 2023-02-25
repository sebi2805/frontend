import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { TransactionInterface } from "../common/Table/types";
import { ErrorTransactionForm, HomeContextInterface } from "./types";

const defaultData: TransactionInterface = {
  name: "",
  currentAmountBank: "",
  currentAmountCash: "null",
  amount: "null",
  type: null,
  deposit: 0,
  date: "",
  frequency: 0,
  startDate: moment().format("DD/MM/YYYY"),
  isRecurent: false,
};
const defaultError: ErrorTransactionForm = {
  amount: "",
  type: "",
  name: "",
  deposit: "",
  date: "",
  frequency: "",
  startDate: "",
  isRecurent: "",
};

export const useHome = (): HomeContextInterface => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { createError, createToast } = useContext(ErrorContext);
  const [data, setData] = useState<TransactionInterface>(defaultData);
  const [error, setError] = useState<ErrorTransactionForm>(defaultError);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
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
      await apiClient
        .post("/api/Transaction/create-transaction", data, authorise())
        .then((res) => {
          createToast("Transaction created");
          setTransactions(
            [...transactions, res.data].sort((a, b) =>
              moment(a.date, "DD/MM/YYYY").diff(moment(b.date, "DD/MM/YYYY"))
            )
          );
        })
        .catch((err) => {
          createError(err.response.data);
        });
    }
    setIsSubmitting(false);
    reset();
  };
  const handleDataChange = (newData: Partial<TransactionInterface>) => {
    setData({ ...data, ...newData });
  };
  const handleErrorChange = (newError: Partial<ErrorTransactionForm>) => {
    setError({ ...error, ...newError });
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
  const reset = () => {
    onClose();
    setData(defaultData);
    setError(defaultError);
    setIsEdit(false);
    setId(null);
  };
  return {
    isOpen,
    onClose: reset,
    onOpen,
    onOpenEdit,
    submit,
    isLoading,
    isSubmitting,
    handleDataChange,
    transactions,
    isEdit,
    error,
    data,
    handleErrorChange,
  };
};
