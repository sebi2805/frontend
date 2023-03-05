import React, { useContext } from "react";
import {
  Accordion,
  AccordionItem,
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { VSFButton } from "../common/VSFButton";
import { TransactionModal } from "../common/VSFTransactionModal/VSFTransactionModal";
import { SettingsContext } from ".";
import { RecurrentTransactionRow } from "./RecurrentTransactionRow";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { UserModal } from "./UserModal/UserModal";
import { ChangePasswordModal } from "./ChangePassword/ChangePassword";
import { CustomSpinner } from "../common/CustomSpinner";
export const Settings: React.FC = () => {
  const {
    submitTransaction,
    id,
    recurrentTransactions,
    deleteUser,
    submitUser,
    submitPassword,
    isLoading,
  } = useContext(SettingsContext);

  return (
    <>
      {" "}
      <VStack w="100%" h="100%" p={12} align={"flex-start"}>
        <HStack w="100%" align={"flex-start"}>
          <Heading>Settings</Heading>
          <Spacer />
          <VStack>
            <TransactionModal submitProps={submitTransaction} idProps={id} />
            <ChangePasswordModal submitProps={submitPassword} />
            <UserModal submitProps={submitUser} />
            <ConfirmationModal
              title="Delete Account"
              message="Are you sure you want to delete your account?"
              onConfirm={deleteUser}
            >
              <VSFButton
                bg="red.600"
                colorScheme={"red"}
                w={44}
                onClick={() => {}}
              >
                Delete Account
              </VSFButton>
            </ConfirmationModal>
          </VStack>
        </HStack>

        <Box pl={4}> Your Recurrent Payments</Box>
        <Flex w="100%" align={"center"}>
          {isLoading ? (
            <CustomSpinner />
          ) : (
            <Accordion allowToggle w="100%">
              {recurrentTransactions.map((transaction) => {
                return (
                  <AccordionItem
                    key={transaction.id}
                    w="100%"
                    border="2px solid"
                    pb={[2, 0]}
                    bg={transaction.type === 10 ? "lightGreen.1" : "red.10"}
                    borderRadius={12}
                  >
                    <RecurrentTransactionRow data={transaction} />
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </Flex>
      </VStack>
    </>
  );
};
