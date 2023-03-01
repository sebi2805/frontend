import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { isEmpty } from "../../utils/helpers";
import { TransactionInterface } from "../common/Table/types";
import { TransactionFormId } from "../common/TransactionModal";
import { ErrorTransactionForm, HomeContextInterface } from "./types";

const defaultData: TransactionInterface = {
  name: "",
  currentAmountBank: "",
  currentAmountCash: "",
  amount: "",
  type: 0,
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

  isRecurent: "",
};

export const useHome = (): HomeContextInterface => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenInitializeModal,
    onClose: onCloseInitializeModal,
    onOpen: onOpenInitializeModal,
  } = useDisclosure();
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
    if (validateForm())
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
        reset();
      }
    setIsSubmitting(false);
  };
  const createErrorObject = (): ErrorTransactionForm => {
    return {
      amount: isEmpty(data.amount),
      type: isEmpty(data.type === 0 ? "" : data.type?.toString()),
      name: isEmpty(data.name),
      deposit: isEmpty(data.deposit === 0 ? "" : data.deposit?.toString()),
      description: "",
      date: isEmpty(data.date),
      frequency: data.isRecurent
        ? isEmpty(data.frequency === 0 ? "" : data.frequency?.toString() || "")
        : "",
      isRecurent: "",
    };
  };
  const validateForm = () => {
    var errorObject = createErrorObject();

    if (
      Object.values(errorObject).every((x) => {
        console.log(x);
        return x === "";
      })
    ) {
      return true;
    } else {
      setError(errorObject);
      for (const key in errorObject) {
        if (errorObject.hasOwnProperty(key) && errorObject[key] !== "") {
          const elementId = TransactionFormId[key];
          document.getElementById(elementId || "")?.focus();
          break;
        }
      }
      return false;
    }
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
    isOpenInitializeModal,
    onCloseInitializeModal,
    onOpenInitializeModal,
  };
};
