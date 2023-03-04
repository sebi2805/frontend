import { useDisclosure } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ErrorContext } from "../../../App";
import { isEmpty } from "../../../utils/helpers";

interface ChangePasswordContextInterface {
  submit: () => void;
  isLoading: boolean;
  errorOldPass: string;
  errorNewPass: string;
  oldPassword: string;
  newPassword: string;
  setNewPassword: (value: string) => void;
  setOldPassword: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setErrorOldPass: (value: string) => void;
  setErrorNewPass: (value: string) => void;
  reset: () => void;
  newPasswordConfirm: string;
  setNewPasswordConfirm: (value: string) => void;
  errorConfirmPassord: string;
  setErrorConfirmPassword: (value: string) => void;
}
//Daca cineva o sa se uite pe codul asta si nu l am rescris sper sa inteaga ca mi a fost o lene si copilot scria tot codul
export const useChangePassword = (
  submitPassword: (oldPassword: string, newPassword: string) => Promise<void>
): ChangePasswordContextInterface => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [errorOldPass, setErrorOldPass] = useState("");
  const [errorNewPass, setErrorNewPass] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [errorConfirmPassord, setErrorConfirmPassword] = useState<string>("");

  const submit = async () => {
    if (validate()) {
      setIsLoading(true);
      await submitPassword(oldPassword, newPassword);
      reset();
    }
  };
  const createErrorObj = () => {
    return {
      oldPassword: isEmpty(oldPassword),
      newPassword:
        isEmpty(newPassword) || newPassword !== newPasswordConfirm
          ? "Password must be the same"
          : "",
    };
  };
  const validate = () => {
    const errors = createErrorObj();
    setErrorNewPass(errors.newPassword);
    setErrorOldPass(errors.oldPassword);
    return !errors.oldPassword && !errors.newPassword;
  };
  const reset = () => {
    setIsLoading(false);
    setErrorOldPass("");
    setErrorNewPass("");
    setOldPassword("");
    setNewPassword("");
    onClose();
  };
  return {
    errorConfirmPassord,
    setErrorConfirmPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    submit,
    isLoading,
    errorOldPass,
    errorNewPass,
    oldPassword,
    newPassword,
    setNewPassword,
    setOldPassword,
    isOpen,
    onClose,
    onOpen,
    setErrorOldPass,
    setErrorNewPass,
    reset,
  };
};
