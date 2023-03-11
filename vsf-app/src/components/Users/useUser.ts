import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { UserInterface } from "../../utils/types";
import { AllUsersContextInterface } from "./types";

export const useUser = (): AllUsersContextInterface => {
  const { createError, createToast } = useContext(ErrorContext);
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);
  const toggleActive = async (id: string) => {
    await apiClient
      .put(`/api/Users/toggle-user?id=${id}`, {}, authorise())
      .then(() => {
        setAllUsers(
          allUsers.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                isActive: !user.isActive,
              };
            }
            return user;
          })
        );
      })
      .catch((error) => {
        createError(error.data);
      });
  };
  const deleteUser = async (id: string) => {
    await apiClient
      .delete(`/api/Users/delete-user?id=${id}`, authorise())
      .then(() => {
        setAllUsers(allUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        createError(error.data);
      });
  };
  const getAllUsers = async () => {
    await apiClient
      .get("/api/Users/get-all-users", authorise())
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        createError(error.data);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return {
    allUsers,
    toggleActive,
    deleteUser,
  };
};
