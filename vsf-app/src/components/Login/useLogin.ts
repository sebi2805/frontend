import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../App";
import { isEmpty } from "../../utils/helpers";
import { useAuth } from "../../utils/useAuth";
import { ErrorLoginForm, LoginContextInterface } from "./types";

const defaultError: ErrorLoginForm = {
  username: "",
  password: "",
};
export const useLogin = (): LoginContextInterface => {
  const { login, loginJWT } = useAuth();
  const { createError, createToast } = useContext(ErrorContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ErrorLoginForm>(defaultError);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordToShow, setPasswordToShow] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => {
    setShow(!show);
    if (show) setPasswordToShow(password);
    else setPasswordToShow(password.replace(/./g, "*"));
  };

  const createErrorObject = () => {
    var error: ErrorLoginForm = {
      username: isEmpty(username),
      password: isEmpty(password),
    };
    return error;
  };
  const checkError = (error: ErrorLoginForm) => {
    if (error.username || error.password) {
      createError(["EMPTY_FIELD"]);
      return true;
    }
    return false;
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      var error = createErrorObject();
      setError(error);
      if (checkError(error)) return;
      await login(username, password);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = async () => {
    navigate("/register");
  };
  const handleForgotPassword = async () => {
    navigate("/forgot-password");
  };

  return {
    handleForgotPassword,
    handleRegister,
    passwordToShow,
    handleShow,
    setPasswordToShow,
    username,
    setUsername,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
};
