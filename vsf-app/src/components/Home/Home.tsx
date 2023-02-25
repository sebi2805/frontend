import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Fragment, useContext } from "react";
import { HomeContext } from ".";
import { UserContext } from "../../App";

import { object } from "../common/Table/types";
import { TransactionModal } from "../common/TransactionModal";
import { VSFButton } from "../common/VSFButton";
import { TransactionRow } from "./TransactionRow";
export const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  const {
    transactions,
    isLoading,
    isSubmitting,
    isOpen,
    isEdit,
    onClose,
    submit,
    onOpen,
    data,
    error,
    handleDataChange,
  } = useContext(HomeContext);

  return (
    <>
      <TransactionModal />
      <VStack align={"flex-start"}>
        <HStack w="100%" py={8} px={16} align="center">
          <Heading>Home</Heading>
          <Spacer />
          <VSFButton onClick={onOpen}>Add transaction</VSFButton>
        </HStack>
        <Flex
          direction={["column", "row"]}
          px={16}
          align={["center", "flex-start"]}
          w="100%"
          fontSize={20}
        >
          <VStack>
            <Box> {"Hi, " + user?.firstName + " " + user?.lastName!}</Box>
            <Box pl={2}>{"Today's date: " + moment().format("DD/MM/YYYY")}</Box>
          </VStack>
          <Spacer />
          <VStack align="center" pt={[4, 0]}>
            <Box> Your current account is:</Box>
            <HStack>
              <Box> Bank: </Box>
              <Box fontWeight={"bold"}> {user?.bank.toFixed(1)}</Box>{" "}
              <Box>RON</Box>
            </HStack>
            <HStack>
              <Box> Cash:</Box>{" "}
              <Box fontWeight={"bold"}>{user?.cash.toFixed(1)} </Box>{" "}
              <Box>RON</Box>
            </HStack>
            <HStack>
              <Box>Total:</Box>
              <Box fontWeight={"bold"}>
                {((user?.bank || 0) + (user?.cash || 0)).toFixed(1)}
              </Box>
              <Box>RON</Box>
            </HStack>
          </VStack>
        </Flex>
        <VStack w="100%" align="flex-start" pt={8}>
          <Box pl={24} fontSize={24} fontWeight={"bold"} pb={4}>
            Transactions in the last month
          </Box>
          <Grid
            templateColumns={["1fr", "1fr", "1fr", "2fr 2fr"]}
            w="100%"
            rowGap={4}
            columnGap={2}
            px={[0, 20]}
          >
            {transactions.map((item) => (
              <Fragment key={item.id}>
                <TransactionRow transaction={item} key={item.id} />
              </Fragment>
            ))}
          </Grid>
        </VStack>
      </VStack>
    </>
  );
};
