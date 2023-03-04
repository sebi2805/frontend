import React from "react";
import { TransactionModal } from "../common/VSFTransactionModal/VSFTransactionModal";
import { VSFButton } from "../common/VSFButton";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { Settings } from "./Settings";
import { SettingsContextInterface } from "./types";
import { UserModal } from "./UserModal";
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
        <ForgotPasswordModal />
        <UserModal />
      </SettingsContext.Provider>
    </>
  );
};
