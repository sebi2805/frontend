import { ToastPosition } from "@chakra-ui/react";

export interface ToastInterface {
  title: string;
  description: string;
  status: "error" | "warning";
  duration: number;
  isClosable: boolean;
  colorScheme: string;
  position: ToastPosition;
  size: string;
}
export interface ErrorContextInterface {
  createError: (message: string[], options?: Partial<ToastInterface>) => void;
  createToast: (message: string, options?: Partial<ToastInterface>) => void;
}
