import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { isEmpty } from "../../../utils/helpers";
import { ErrorTransactionForm } from "../../Home/types";
import { TransactionInterface } from "../Table/types";
import { TransactionFormId } from "./VSFTransactionModal";
const defaultError: ErrorTransactionForm = {
  amount: "",
  type: "",
  name: "",
  deposit: "",
  date: "",
  frequency: "",
  isRecurent: "",
};
const defaultData: TransactionInterface = {
  name: "",
  currentAmountBank: "",
  currentAmountCash: "",
  amount: "",
  type: 0,
  deposit: 0,
  frequency: 0,
  date: moment().toISOString(),
  isRecurent: false,
};
export interface useTransactionInterface {
  data: TransactionInterface;
  error: ErrorTransactionForm;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  submit: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  handleErrorChange: (error: Partial<ErrorTransactionForm>) => void;
  isEdit: boolean;
  handleDataChange: (date: Partial<TransactionInterface>) => void;
}

export const useTransaction = (
  submitProps: (data: TransactionInterface) => void,
  idProps?: string
): useTransactionInterface => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<TransactionInterface>(defaultData);
  const [error, setError] = useState<ErrorTransactionForm>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
  const reset = () => {
    onClose();
    setData(defaultData);
    setError(defaultError);
    setId("");
    setIsSubmitting(false);
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const submit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      submitProps(data);
      reset();
    }
  };
  const isEdit = idProps !== undefined;
  return {
    data,
    error,
    isOpen,
    onClose,
    onOpen,
    submit,
    isLoading,
    isSubmitting,
    handleErrorChange,
    isEdit,
    handleDataChange,
  };
};
