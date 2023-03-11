import {
  Accordion,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { NameWrap } from "../common/NameWrap";
import { DepositType, TransactionInterface } from "../common/Table/types";
import { ReactComponent as ExpensesIcon } from "../../Assets/Icons/Expenses.svg";
import { ReactComponent as IncomesIcon } from "../../Assets/Icons/Incomes.svg";
import moment from "moment";
import { ReactComponent as Options } from "../../Assets/Icons/Options.svg";
import { HomeContext } from ".";
export interface TransactionRowProps {
  transaction: TransactionInterface;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  handleDelete,
  handleEdit,
}) => {
  return (
    <GridItem w="100%">
      <AccordionButton w="100%">
        <Flex
          //         display={["none", "flex"]}
          direction={["column", "row"]}
          w="100%"
          align={["center", "flex-start"]}
          justify={"space-between"}
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
            ml={[0, 2]}
            direction={["row", "column"]}
            title="Name"
            w={["80%", "50%"]}
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {transaction.name}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Date"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {moment(transaction.date).format("DD/MM/YYYY")}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Type"
            w={["80%", "50%"]}
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {DepositType[transaction.deposit ?? 0]}
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
        </Flex>
        <Menu>
          <MenuButton as={Box} cursor={"pointer"}>
            <Icon as={Options} boxSize={8} />
          </MenuButton>
          <MenuList bg="white">
            <MenuItem
              bg="white"
              _hover={{ bg: "purple.10" }}
              onClick={() => handleEdit(transaction.id || "")}
            >
              Edit
            </MenuItem>

            <MenuItem
              color="red.500"
              bg="white"
              _hover={{ bg: "purple.10" }}
              onClick={() => handleDelete(transaction.id || "")}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </AccordionButton>
      <AccordionPanel>
        <VStack w="100%" pl={[0, 12]}>
          {transaction.description ? (
            <Flex w="100%">
              <NameWrap
                title="Description"
                direction={["row", "column"]}
                w="80%"
                fontWeight={"bold"}
              >
                <Text textAlign={["end", "start"]} pr={2}>
                  {transaction.description}
                </Text>
              </NameWrap>
            </Flex>
          ) : null}
          <HStack w="100%">
            <NameWrap
              title="Current Bank"
              direction={"column"}
              w="80%"
              fontWeight={"bold"}
            >
              <Text textAlign={["end", "start"]} pr={2}>
                {transaction.currentAmountBank} RON
              </Text>
            </NameWrap>
            <NameWrap
              title="Current Cash"
              direction={"column"}
              w="80%"
              fontWeight={"bold"}
            >
              <Text textAlign={["end", "start"]} pr={2}>
                {transaction.currentAmountCash} RON
              </Text>
            </NameWrap>
          </HStack>
        </VStack>
      </AccordionPanel>
    </GridItem>
  );
};
