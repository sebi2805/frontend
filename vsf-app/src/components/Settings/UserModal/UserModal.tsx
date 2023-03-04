import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { isEmpty, isNumeric } from "../../../utils/helpers";
import { NameWrap } from "../../common/NameWrap";
import { VSFButton } from "../../common/VSFButton";
import { VSFInput } from "../../common/VSFInput";
import {
  UserModalFormId,
  UserModalInterface,
  useUserModal,
} from "./useUserModal";

interface UserModalProps {
  submitProps: (data: UserModalInterface) => void;
}

export const UserModal: React.FC<UserModalProps> = ({ submitProps }) => {
  const {
    isOpen,
    onOpen,
    onClose,
    data,
    error,
    handleDataChange,
    handleErrorChange,
    submit,
  } = useUserModal(submitProps);
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ username: e.target.value });
    handleErrorChange({ username: isEmpty(e.target.value) });
  };

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ firstName: e.target.value });
    handleErrorChange({ firstName: isEmpty(e.target.value) });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ lastName: e.target.value });
    handleErrorChange({ lastName: isEmpty(e.target.value) });
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ bank: e.target.value });
    handleErrorChange({
      bank: isEmpty(e.target.value) || isNumeric(e.target.value),
    });
  };

  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDataChange({ cash: e.target.value });
    handleErrorChange({
      cash: isEmpty(e.target.value) || isNumeric(e.target.value),
    });
  };

  return (
    <>
      <VSFButton onClick={onOpen} w={44}>
        Change user
      </VSFButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>
            Change user
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack>
              <NameWrap title="Username" w="100%" error={error.username}>
                <VSFInput
                  id={UserModalFormId.username}
                  error={error.username}
                  value={data?.username}
                  placeholder="Username"
                  onChange={handleUsernameChange}
                />
              </NameWrap>
              <NameWrap title="Firstname" w="100%" error={error.firstName}>
                <VSFInput
                  id={UserModalFormId.firstName}
                  error={error.firstName}
                  value={data?.firstName}
                  placeholder="Firstname"
                  onChange={handleFirstnameChange}
                />
              </NameWrap>
              <NameWrap title="Lastname" w="100%" error={error.lastName}>
                <VSFInput
                  id={UserModalFormId.lastName}
                  error={error.lastName}
                  value={data?.lastName}
                  placeholder="Lastname"
                  onChange={handleLastNameChange}
                />
              </NameWrap>
              <NameWrap title="Bank" w="100%" error={error.bank}>
                <VSFInput
                  id={UserModalFormId.bank}
                  error={error.bank}
                  value={data?.bank}
                  placeholder="Bank"
                  onChange={handleBankChange}
                />
              </NameWrap>
              <NameWrap title="Cash" w="100%" error={error.cash}>
                <VSFInput
                  id={UserModalFormId.cash}
                  error={error.cash}
                  value={data?.cash}
                  placeholder="Cash"
                  onChange={handleCashChange}
                />
              </NameWrap>
              <HStack>
                <VSFButton onClick={onClose} w={44}>
                  Cancel
                </VSFButton>
                <VSFButton onClick={submit} w={44}>
                  Submit
                </VSFButton>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
