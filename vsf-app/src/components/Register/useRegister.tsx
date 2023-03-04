import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apiClient";
import { ErrorContext } from "../../App";
import { isEmpty } from "../../utils/helpers";
import {
  ErrorRegisterForm,
  RegisterContextInterface,
  RegisterPassword,
} from "./types";

const defaultPasswords: RegisterPassword = {
  password: "",
  confirmPassword: "",
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

  const [passwords, setPasswords] =
    useState<RegisterPassword>(defaultPasswords);
  const [error, setError] = useState<ErrorRegisterForm>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validateForm = (): ErrorRegisterForm => {
    var error: ErrorRegisterForm = {
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: "",
    };
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
    var errorObj = validateForm();

    if (Object.keys(errorObj).some((key) => errorObj[key] !== "")) {
      setError(errorObj);
    } else {
      setIsLoading(true);
      await apiClient
        .post("/api/register", {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: passwords.password,
        })
        .then(() => {
          createToast("Account created successfully");
          setTimeout(() => {
            navigator("/login");
          }, 1000);
        })
        .catch((err) => {
          if (err.response.data.includes("USER_ALREADY_EXISTS"))
            setError({ ...error, username: "Username already exists" });
          createError(err.response.data);
        });
    }
    setIsLoading(false);
  };
  const handleLogin = () => {
    navigator("/login");
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    passwords,
    setPasswords,
    error,
    setError,
    isLoading,
    handleRegister,
    handleLogin,
  };
};
