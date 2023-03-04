import {
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { ReactComponent as ExpensesIcon } from "../../Assets/Icons/Expenses.svg";
import { ReactComponent as IncomesIcon } from "../../Assets/Icons/Incomes.svg";
import { NameWrap } from "../common/NameWrap";
import { DepositType, FrequencyType } from "../common/Table/types";
import { RecurrentTransactionInterface } from "./types";
import { ReactComponent as Options } from "../../Assets/Icons/Options.svg";
export interface RecurrentTransactionRowProps {
  data: RecurrentTransactionInterface;
}
export const RecurrentTransactionRow: React.FC<
  RecurrentTransactionRowProps
> = ({ data }) => {
  const { name, type, amount, date, frequency, isCanceled, description } = data;

  return (
    <>
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
              as={type === 10 ? IncomesIcon : ExpensesIcon}
              w={12}
              h={12}
              borderRadius={"100%"}
              bg={type === 10 ? "green.100" : "red.100"}
              border={"2px solid"}
              borderColor={type === 10 ? "green.500" : "red.500"}
              stroke={type === 10 ? "green.500" : "red.500"}
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
              {name}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Amount"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {amount} RON
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Date"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {moment(date).format("DD/MM/YYYY")}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Frequency"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {FrequencyType[frequency ?? 0]}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Type"
            w={["80%", "50%"]}
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {DepositType[type ?? 0]}
            </Text>
          </NameWrap>
        </Flex>
        <Menu>
          <MenuButton as={Box} cursor={"pointer"}>
            <Icon as={Options} boxSize={8} />
          </MenuButton>
          <MenuList bg="white">
            <MenuItem bg="white" _hover={{ bg: "purple.10" }}>
              Edit
            </MenuItem>
            <MenuItem bg="white" _hover={{ bg: "purple.10" }}>
              {isCanceled ? "Activate" : "Deactivate"}
            </MenuItem>
            <MenuItem color="red.500" bg="white" _hover={{ bg: "purple.10" }}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </AccordionButton>
      <AccordionPanel>
        <VStack w="100%" pl={[0, 12]}>
          {description ? (
            <Flex w="100%">
              <NameWrap
                title="Description"
                direction={["row", "column"]}
                w="80%"
                fontWeight={"bold"}
              >
                <Text textAlign={["end", "start"]} pr={2}>
                  {description}
                </Text>
              </NameWrap>
            </Flex>
          ) : null}
        </VStack>
      </AccordionPanel>
    </>
  );
};
