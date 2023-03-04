import React, { useContext } from "react";
import { SettingsContext } from ".";
export const ForgotPasswordModal: React.FC = () => {
  const {
    isOpenForgetPassword,
    onOpenForgetPassword,
    onCloseForgetPassword,
    isLoadingPasswordChanges,
  } = useContext(SettingsContext);
  return <></>;
};
