import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { VSFButton } from "./VSFButton";

export interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  children?: React.ReactNode;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  children,
  onConfirm,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <VSFButton
              onClick={handleConfirm}
              mr={2}
              bg="red.500"
              colorScheme={"red"}
            >
              Confirm
            </VSFButton>
            <VSFButton variant="ghost" onClick={handleCancel}>
              Cancel
            </VSFButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
