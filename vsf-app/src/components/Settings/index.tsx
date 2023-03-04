import React from "react";
import { Settings } from "./Settings";
import { SettingsContextInterface } from "./types";
import { useSettings } from "./useSettings";

export const SettingsContext = React.createContext<SettingsContextInterface>(
  {} as SettingsContextInterface
);
export const SettingsComponent: React.FC = () => {
  const settingsHook = useSettings();
  return (
    <>
      <SettingsContext.Provider value={settingsHook}>
        <Settings />
      </SettingsContext.Provider>
    </>
  );
};
