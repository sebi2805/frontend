import React, { useContext } from "react";
import {
  Accordion,
  AccordionItem,
  Box,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { VSFButton } from "../common/VSFButton";
import { TransactionModal } from "../common/VSFTransactionModal/VSFTransactionModal";
import { SettingsContext } from ".";
import { RecurrentTransactionRow } from "./RecurrentTransactionRow";
export const Settings: React.FC = () => {
  const { submitTransaction, idRecurrentTransaction, recurrentTransactions } =
    useContext(SettingsContext);
  return (
    <>
      {" "}
      <VStack w="100%" h="100%" p={12} align={"flex-start"}>
        <HStack w="100%" align={"flex-start"}>
          <Heading>Settings</Heading>
          <Spacer />
          <VStack>
            <TransactionModal
              submitProps={submitTransaction}
              idProps={idRecurrentTransaction}
            />
            <VSFButton w={44} onClick={() => {}}>
              Change password
            </VSFButton>
            <VSFButton w={44} onClick={() => {}}>
              Change user
            </VSFButton>
            <VSFButton
              bg="red.600"
              colorScheme={"red"}
              w={44}
              onClick={() => {}}
            >
              Delete account
            </VSFButton>
          </VStack>
        </HStack>

        <Box pl={4}> Your Recurrent Payments</Box>
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
      </VStack>
    </>
  );
};
