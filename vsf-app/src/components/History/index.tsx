import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { CustomSpinner } from "../common/CustomSpinner";
import { VSFButton } from "../common/VSFButton";
import { TransactionModal } from "../common/VSFTransactionModal/VSFTransactionModal";
import { TransactionRow } from "../Home/TransactionRow";
import { useHistory } from "./useHistory";
export const HistoryComponent: React.FC = () => {
  const {
    transactions,
    submit,
    id,
    handleDelete,
    handleEdit,
    getData,
    isLoadingMore,
    setId,
  } = useHistory();
  const [indexes, setIndexes] = React.useState<number[]>([]);
  const handleIndexChange = (index: number) => {
    if (indexes.includes(index)) {
      setIndexes(
        indexes.filter((i) => Math.floor(i / 2) !== Math.floor(index / 2))
      );
    } else {
      setIndexes([...indexes, index, index % 2 === 0 ? index + 1 : index - 1]);
    }
  };

  return (
    <>
      <VStack align={"flex-start"} w="100%" px={24} id="history" pb={6}>
        <HStack w="100%" py={8} align="center">
          <Heading>History</Heading>
          <Spacer />
          <TransactionModal
            submitProps={submit}
            idProps={id}
            setIdProps={setId}
          />
        </HStack>
        <Accordion allowToggle w={"100%"} h="100%">
          {transactions.map((transaction, index) => (
            <AccordionItem
              key={transaction.id}
              w="100%"
              onClick={() => {
                handleIndexChange(index);
              }}
              border="2px solid"
              pb={[2, 0]}
              mb={2}
              bg={transaction.type === 10 ? "lightGreen.1" : "red.10"}
              borderRadius={12}
            >
              <TransactionRow
                transaction={transaction}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </AccordionItem>
          ))}
        </Accordion>
        <Flex w="100%" justify={"center"}>
          {isLoadingMore ? (
            <CustomSpinner />
          ) : (
            <VSFButton onClick={getData}>
              Load More <ChevronDownIcon boxSize={8} />
            </VSFButton>
          )}
        </Flex>
      </VStack>
    </>
  );
};
