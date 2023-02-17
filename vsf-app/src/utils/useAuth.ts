import { useContext, useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import { ErrorContext } from "../App";
import { UserContextinterface, UserInterface } from "./types";

export const useAuth = (): UserContextinterface => {
  const [user, setUser] = useState<UserInterface | null>({
    firstName: "Sebastian",
    lastName: "Virtopeanu",
    bank: 1000,
    cash: 1000,
    userRole: "admin",
    id: "1",
  });

  const { createError, createToast } = useContext(ErrorContext);
  const login = async (username: string, password: string) => {
    await apiClient
      .get(
        `/authentication/login-user?username=${username}&password=${password}`
      )
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("clientJWT", res.data.clientJWT);
      })
      .catch((err) => {
        createError(err.response.data);
      });
  };
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("clientJWT");
  };
  const loginJWT = async (clientJWT: string) => {
    await apiClient
      .get(`/authentication/login-user?clientJWT=${clientJWT}`)
      .catch((err) => {
        // logout();
      });
  };
  useEffect(() => {
    const clientJWT = localStorage.getItem("clientJWT");
    if (clientJWT) {
      loginJWT(clientJWT);
    }
  }, []);
  return {
    user,
    setUser,
    login,
    logout,
  };
};
