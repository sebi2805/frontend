import { useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient, authorise } from "../../../apiClient";
import { ErrorContext } from "../../../App";
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
  reset: () => void;
  handleErrorChange: (error: Partial<ErrorTransactionForm>) => void;
  idProps?: string;
  handleDataChange: (date: Partial<TransactionInterface>) => void;
}

export const useTransaction = (
  submitProps: (data: TransactionInterface) => void,
  idProps?: string,
  setIdProps?: (id: string) => void
): useTransactionInterface => {
  const { createError } = useContext(ErrorContext);
  const [id, setId] = useState<string>(idProps || "");
  const location = useLocation();
  const [data, setData] = useState<TransactionInterface>({
    ...defaultData,
    isRecurent: location.pathname.includes("setting"),
  });
  const [error, setError] = useState<ErrorTransactionForm>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const createErrorObject = (): ErrorTransactionForm => {
    return {
      amount: isEmpty(data.amount.toString()),
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
  const initializeEdit = async () => {
    setIsLoading(true);
    onOpen();
    await apiClient
      .get(`/api/Transaction/get-transaction?id=${idProps}`, authorise())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        createError(err.data);
      });
    setIsLoading(false);
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
    setIdProps?.("");
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const submit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      submitProps(data);
      reset();
    }
  };
  useEffect(() => {
    if (id) {
      initializeEdit();
    }
  }, [id]);
  useEffect(() => {
    setId(idProps || "");
  }, [idProps]);
  return {
    reset,
    data,
    error,
    isOpen,
    onClose,
    onOpen,
    submit,
    isLoading,
    isSubmitting,
    handleErrorChange,
    idProps,
    handleDataChange,
  };
};
