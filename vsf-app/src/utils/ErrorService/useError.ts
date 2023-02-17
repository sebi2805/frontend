import { useToast } from "@chakra-ui/react";
import { ResponseDictionary } from "./ResponseDictionary";

import { ErrorContextInterface, ToastInterface } from "./types";

export const useError = (): ErrorContextInterface => {
  const toast = useToast();

  const defaultErrorMessages: Partial<ToastInterface> = {
    title: "An error has occcured",
    description: "Whoops! Something went wrong.",
    position: "top-right",
    isClosable: true,
    status: "error",
  };
  const translation = (code: string) => {
    return ResponseDictionary[code] ?? "An error has occured";
  };

  const createError = (
    errorMessage: string[],
    options?: Partial<ToastInterface>
  ) => {
    errorMessage.map((errMsg) => {
      return toast({
        ...defaultErrorMessages,
        title: "ERROR",
        description: translation(errMsg),
        ...options,
      });
    });
  };
  const createToast = (message?: string, options?: Partial<ToastInterface>) => {
    return toast({
      title: options?.status === "warning" ? "Warning" : "Success",
      description: `${message || "The operation was a succes"}`,
      status: "success",
      position: "top-right",
      isClosable: true,
      ...options,
    });
  };
  return { createError, createToast };
};
