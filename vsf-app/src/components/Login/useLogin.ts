import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../../App";
import { useAuth } from "../../utils/useAuth";
import { ErrorLoginForm, LoginContextInterface } from "./types";

const defaultError: ErrorLoginForm = {
  username: "",
  password: "",
};
export const useLogin = (): LoginContextInterface => {
  const { login } = useAuth();
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

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(username, password);
      navigate("/register");
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
