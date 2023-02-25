import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { ErrorContext } from "../../App";
import { isEmpty } from "../../utils/helpers";
import {
  ErrorRegisterForm,
  RegisterContextInterface,
  RegisterPassword,
  ShowPasswords,
} from "./types";

const defaultPasswords: RegisterPassword = {
  password: "",
  confirmPassword: "",
  passwordToShow: "",
  confirmPasswordToShow: "",
};
const defaultError: ErrorRegisterForm = {
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  username: "",
};
export const useRegister = (): RegisterContextInterface => {
  const navigator = useNavigate();
  const { createError, createToast } = useContext(ErrorContext);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    showPassword: false,
    showConfirmPassword: false,
  });
  const [passwords, setPasswords] =
    useState<RegisterPassword>(defaultPasswords);
  const [error, setError] = useState<ErrorRegisterForm>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validateForm = (): ErrorRegisterForm => {
    var error: ErrorRegisterForm = defaultError;
    if (passwords.password.length < 8) {
      error.password = "Password too short";
    }
    if (passwords.password !== passwords.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }
    if (firstName.length < 3) {
      error.firstName = "First name too short";
    }
    if (lastName.length < 3) {
      error.lastName = "Last name too short";
    }
    error.confirmPassword = isEmpty(passwords.confirmPassword);
    error.password = isEmpty(passwords.password);
    error.firstName = isEmpty(firstName);
    error.lastName = isEmpty(lastName);
    error.username = isEmpty(username);
    return error;
  };
  const handleRegister = async () => {
    setIsLoading(true);
    const error = validateForm();

    if (Object.keys(error).some((key) => error[key] !== "")) {
      setError(error);
    } else {
      await apiClient
        .post("/register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: passwords.password,
        })
        .then(() => {
          createToast("Account created successfully");
          setTimeout(() => {
            navigator("/home");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.message.includes("USER_ALREADY_EXISTS"))
            setError({ ...error, username: "Username already exists" });
          createError(err.response.data);
        });
    }
    setIsLoading(false);
  };
  const handleLogin = () => {
    navigator("/login");
  };
  const showPassword = () => {
    setShowPasswords({
      ...showPasswords,
      showPassword: !showPasswords.showPassword,
    });
    setPasswords({
      ...passwords,
      passwordToShow: !showPasswords.showPassword
        ? passwords.password
        : passwords.password.replace(/./g, "*"),
    });
  };
  const showConfirmPassword = () => {
    setShowPasswords({
      ...showPasswords,
      showConfirmPassword: !showPasswords.showConfirmPassword,
    });
    setPasswords({
      ...passwords,
      confirmPasswordToShow: !showPasswords.showConfirmPassword
        ? passwords.confirmPassword
        : passwords.confirmPassword.replace(/./g, "*"),
    });
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    setShowPasswords,
    showPasswords,
    username,
    setUsername,
    passwords,
    setPasswords,
    error,
    setError,
    isLoading,
    showConfirmPassword,
    showPassword,
    handleRegister,
    handleLogin,
  };
};
