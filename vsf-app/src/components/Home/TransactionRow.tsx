import { Flex, Grid, GridItem, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { NameWrap } from "../common/NameWrap";
import { DepositType, TransactionInterface } from "../common/Table/types";
import { ReactComponent as ExpensesIcon } from "../../Assets/Icons/Expenses.svg";
import { ReactComponent as IncomesIcon } from "../../Assets/Icons/Incomes.svg";
export interface TransactionRowProps {
  transaction: TransactionInterface;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
}) => {
  return (
    <GridItem w="100%" px={[12, 0]}>
      <Flex
        //         display={["none", "flex"]}
        direction={["column", "row"]}
        w="100%"
        p={2}
        pb={0}
        align={["center", "flex-start"]}
        justify={"space-between"}
        border="2px solid"
        bg={transaction.type === 10 ? "lightGreen.1" : "red.10"}
        borderRadius={12}
      >
        <NameWrap title="">
          <Icon
            as={transaction.type === 10 ? IncomesIcon : ExpensesIcon}
            w={12}
            h={12}
            borderRadius={"100%"}
            bg={transaction.type === 10 ? "green.100" : "red.100"}
            border={"2px solid"}
            borderColor={transaction.type === 10 ? "green.500" : "red.500"}
            stroke={transaction.type === 10 ? "green.500" : "red.500"}
          ></Icon>
        </NameWrap>
        <NameWrap
          pl={2}
          direction={["row", "column"]}
          title="Date"
          w="80%"
          fontWeight={"bold"}
        >
          <Text textAlign={["end", "start"]} pr={2}>
            {transaction.date}
          </Text>
        </NameWrap>
        <NameWrap
          direction={["row", "column"]}
          title="Type"
          w="80%"
          fontWeight={"bold"}
        >
          <Text textAlign={["end", "start"]} pr={2}>
            {DepositType[transaction.type]}
          </Text>
        </NameWrap>
        <NameWrap
          direction={["row", "column"]}
          title="Amount"
          w="80%"
          fontWeight={"bold"}
        >
          <Text textAlign={["end", "start"]} pr={2}>
            {transaction.amount} RON
          </Text>
        </NameWrap>
        <NameWrap
          title="Current Bank"
          direction={["row", "column"]}
          w="80%"
          fontWeight={"bold"}
        >
          <Text textAlign={["end", "start"]} pr={2}>
            {transaction.currentAmountBank} RON
          </Text>
        </NameWrap>
        <NameWrap
          title="Current Cash"
          direction={["row", "column"]}
          w="80%"
          fontWeight={"bold"}
        >
          <Text textAlign={["end", "start"]} pr={2}>
            {transaction.currentAmountCash} RON
          </Text>
        </NameWrap>
      </Flex>
    </GridItem>
  );
};
