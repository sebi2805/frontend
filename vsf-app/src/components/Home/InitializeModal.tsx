import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { HomeContext } from ".";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext, UserContext } from "../../App";
import { NameWrap } from "../common/NameWrap";
import { VSFButton } from "../common/VSFButton";
import { VSFInput } from "../common/VSFInput";
export const IntializeModal: React.FC = () => {
  const {
    isOpenInitializeModal,
    onOpenInitializeModal,
    onCloseInitializeModal,
  } = useContext(HomeContext);
  const [bank, setBank] = React.useState("0");
  const [cash, setCash] = React.useState("0");
  const { setUser, user } = useContext(UserContext);
  const { createError, createToast } = useContext(ErrorContext);
  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value);
  };
  const handleCashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCash(e.target.value);
  };
  const handleSubmit = async () => {
    await apiClient(
      `/api/Users/initialize-user?bank=${bank}&cash=${cash}`,
      authorise()
    )
      .then((res) => {
        setUser(res.data);
        createToast("Successfully initialized");
      })
      .catch((err) => {
        createError(err.data);
      });
  };
  const handleSkip = async () => {
    await apiClient(`/api/Users/initialize-user?bank=0&cash=0`, authorise())
      .then(() => {
        createToast("Successfully initialized");
      })
      .catch((err) => {
        createError(err.data);
      });
  };
  useEffect(() => {
    if (user && user.hasLogin === false) {
      onOpenInitializeModal();
    }
  }, []);
  return (
    <Modal isOpen={isOpenInitializeModal} onClose={onCloseInitializeModal}>
      <ModalOverlay />

      <ModalContent bg="white">
        <ModalHeader> Welcome!</ModalHeader>
        <ModalBody>
          <VStack>
            <Box>
              This is your first succesuful authentication. Please enter your
              current cash and bank, so we can have a start
            </Box>
            <Box>
              *If you dont want to enter your current cash and bank, you can
              press skip, in that case it will be 0
            </Box>
            <NameWrap title="Bank">
              <VSFInput value={bank} onChange={handleBankChange} />
            </NameWrap>
            <NameWrap title="Cash">
              <VSFInput value={cash} onChange={handleCashChange} />
            </NameWrap>
            <Flex justify="flex-end" w="100%" pt={2}>
              <Box mr={2}>
                <VSFButton onClick={handleSubmit}>Save</VSFButton>
              </Box>
              <Box>
                <VSFButton onClick={handleSkip}>Skip</VSFButton>
              </Box>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
