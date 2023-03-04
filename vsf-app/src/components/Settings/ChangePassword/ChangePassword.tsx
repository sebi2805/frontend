import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { SettingsContext } from "..";
import { isEmpty } from "../../../utils/helpers";
import { NameWrap } from "../../common/NameWrap";
import { VSFButton } from "../../common/VSFButton";
import { VSFPasswordInput } from "../../common/VSFPasswordInput";
import { useChangePassword } from "./useChangePassword";
interface ChangePasswordModalProps {
  submitProps: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  submitProps,
}) => {
  const {
    submit,
    onOpen,
    isOpen,
    oldPassword,
    newPassword,
    errorNewPass,
    errorOldPass,
    setNewPassword,
    setOldPassword,
    setErrorNewPass,
    reset,
    setErrorOldPass,
    newPasswordConfirm,
    setNewPasswordConfirm,
    errorConfirmPassord,
    setErrorConfirmPassword,
  } = useChangePassword(submitProps);

  const handleOldPasswordChange = (e: string) => {
    setErrorOldPass(isEmpty(e));
    setOldPassword(e);
  };
  const handleNewPasswordChange = (e: string) => {
    setErrorNewPass(isEmpty(e));
    setNewPassword(e);
  };
  const handleConfirmPasswordChange = (e: string) => {
    setErrorConfirmPassword(isEmpty(e));
    setNewPasswordConfirm(e);
  };

  return (
    <>
      <VSFButton onClick={onOpen} w={44}>
        Change Password
      </VSFButton>
      <Modal isOpen={isOpen} onClose={reset} size={"xl"}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>
            Change password
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack w="100%">
              <NameWrap w="100%" title="Old password" error={errorOldPass}>
                <VSFPasswordInput
                  placeholder="Enter old password"
                  password={oldPassword}
                  error={errorOldPass}
                  handlePasswordChange={handleOldPasswordChange}
                />
              </NameWrap>
              <NameWrap w="100%" title="New password" error={errorNewPass}>
                <VSFPasswordInput
                  placeholder="Enter new password"
                  password={newPassword}
                  error={errorNewPass}
                  handlePasswordChange={handleNewPasswordChange}
                />
              </NameWrap>
              <NameWrap
                w="100%"
                title="Confirm new password"
                error={errorNewPass}
              >
                <VSFPasswordInput
                  placeholder="Enter confirm new password"
                  password={newPasswordConfirm}
                  error={errorConfirmPassord}
                  handlePasswordChange={handleConfirmPasswordChange}
                />
              </NameWrap>
              <HStack w="100%" justify="flex-end" pt={4}>
                <VSFButton onClick={reset}>Cancel</VSFButton>
                <VSFButton onClick={submit}>Submit</VSFButton>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
