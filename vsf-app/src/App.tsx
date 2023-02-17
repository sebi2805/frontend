import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { UserContextinterface } from "./utils/types";
import { ErrorContextInterface } from "./utils/ErrorService/types";
import { Router } from "./components/Router/Router";
import { useAuth } from "./utils/useAuth";
import { useError } from "./utils/ErrorService/useError";

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
