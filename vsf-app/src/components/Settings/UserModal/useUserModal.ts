import { useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import { isEmpty, isNumeric } from "../../../utils/helpers";

export type FormIdDictionary = Record<string, string>;
export const UserModalFormId: FormIdDictionary = {
  username: "id-user- username",
  firstName: "id-user-firstName",
  lastName: "id-user-lastName",
  bank: "id-user-bank",
  cash: "id-user-cash",
};

export interface UserModalInterface {
  username: string;
  firstName: string;
  lastName: string;
  bank: string;
  cash: string;
}
export interface ErrorUserModalInterface {
  username: string;
  firstName: string;
  lastName: string;
  bank: string;
  cash: string;
  [key: string]: string | undefined;
}
export interface UserModalContextInterface {
  data: UserModalInterface;
  changeData: (data: Partial<UserModalInterface>) => void;
  submit: () => void;
  isOpen: boolean;
  onOpen: () => void;
  isLoading: boolean;
  error: ErrorUserModalInterface;
  onClose: () => void;
}

const defaultError: ErrorUserModalInterface = {
  username: "",
  firstName: "",
  lastName: "",
  bank: "",
  cash: "",
};

export const useUserModal = (
  submitProps: (data: UserModalInterface) => void
) => {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<UserModalInterface>({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bank: user?.bank.toString() || "",
    cash: user?.cash.toString() || "",
  });
  const [error, setError] = useState<ErrorUserModalInterface>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDataChange = (data: Partial<UserModalInterface>) => {
    setData((prev) => ({ ...prev, ...data }));
  };
  const handleErrorChange = (data: Partial<ErrorUserModalInterface>) => {
    setError((prev) => ({ ...prev, ...data }));
  };
  const createErrorObject = (): ErrorUserModalInterface => {
    var errorObject: ErrorUserModalInterface = {
      username: "",
      firstName: "",
      lastName: "",
      bank: "",
      cash: "",
    };
    errorObject.username = isEmpty(data.username);
    errorObject.firstName = isEmpty(data.firstName);
    errorObject.lastName = isEmpty(data.lastName);
    errorObject.bank = isEmpty(data.bank) || isNumeric(data.bank);
    errorObject.cash = isEmpty(data.cash) || isNumeric(data.cash);
    return errorObject;
  };

  const validate = () => {
    const errorObject = createErrorObject();
    console.log(errorObject);
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
          const elementId = UserModalFormId[key];
          console.log(document.getElementById(elementId || ""));
          document.getElementById(elementId || "")?.focus();
          break;
        }
      }
      return false;
    }
  };
  const submit = () => {
    if (validate()) {
      setIsLoading(true);
      submitProps(data);
      reset();
    }
  };
  const reset = () => {
    setData({
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      bank: user?.bank.toString() || "",
      cash: user?.cash.toString() || "",
    });
    setIsLoading(false);
    setError(defaultError);
    onClose();
  };
  return {
    error,
    data,
    handleDataChange,
    isOpen,
    onOpen,
    onClose: reset,
    isLoading,
    submit,
    handleErrorChange,
  };
};
