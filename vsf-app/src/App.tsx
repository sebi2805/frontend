import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { Router } from "./components/Router/Router";
import { theme } from "./theme";
import { ErrorContextInterface } from "./utils/ErrorService/types";
import { useError } from "./utils/ErrorService/useError";
import { UserContextinterface } from "./utils/types";
import { useAuth } from "./utils/useAuth";

export const UserContext = React.createContext<UserContextinterface>(
  {} as UserContextinterface
);
export const ErrorContext = React.createContext<ErrorContextInterface>(
  {} as ErrorContextInterface
);

export const App = () => {
  const userHooK = useAuth();
  const errorHook = useError();
  return (
    <ChakraProvider theme={theme}>
      <ErrorContext.Provider value={errorHook}>
        <UserContext.Provider value={userHooK}>
          <Router />
        </UserContext.Provider>
      </ErrorContext.Provider>
    </ChakraProvider>
  );
};
