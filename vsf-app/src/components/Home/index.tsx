import React, { createContext } from "react";
import { Home } from "./Home";
import { IntializeModal } from "./InitializeModal";
import { HomeContextInterface } from "./types";
import { useHome } from "./useHome";

export const HomeContext = createContext<HomeContextInterface>(
  {} as HomeContextInterface
);
export const HomeComponent: React.FC = () => {
  const homeHook = useHome();

  return (
    <>
      <HomeContext.Provider value={homeHook}>
        <Home />
        <IntializeModal />
      </HomeContext.Provider>
    </>
  );
};
