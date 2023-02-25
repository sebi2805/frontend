import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../apiClient";
import { ErrorContext } from "../App";
import { UserContextinterface, UserInterface } from "./types";

export const useAuth = (): UserContextinterface => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [didMount, setDidMount] = useState<boolean>(false);
  const { createError, createToast } = useContext(ErrorContext);
  const login = async (username: string, password: string) => {
    await apiClient
      .get(`/login-user?username=${username}&password=${password}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("clientJWT", res.data.clientJWT);
        createToast("Login successful");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        createError(err.response.data);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("clientJWT"))
      loginJWT(localStorage.getItem("clientJWT") || "");
    else logout();
  }, [location]);
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("clientJWT");
    setDidMount(true);
  };
  const loginJWT = async (clientJWT: string) => {
    await apiClient
      .get(`/login-by-jwt?clientJWT=${clientJWT}`)
      .then((res) => {
        setUser(res.data);
        setDidMount(true);
      })
      .catch((err) => {
        logout();
      });
  };

  return {
    didMount,
    user,
    setUser,
    login,
    logout,
    loginJWT,
  };
};
