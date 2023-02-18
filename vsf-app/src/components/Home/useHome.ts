import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
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
  const [data, setData] = useState<TransactionInterface>(defaultData);
  const [error, setError] = useState<ErrorTransactionForm>(defaultError);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {};
  const handleDataChange = (newData: Partial<TransactionInterface>) => {
    setData({ ...data, ...newData });
  };
  const handleErrorChange = (newError: Partial<ErrorTransactionForm>) => {
    setError({ ...error, ...newError });
  };
  const onOpenEdit = (id: string) => {};
  useEffect(() => {
    setIsLoading(false);
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
