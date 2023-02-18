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
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { NameWrap } from "../common/NameWrap";

import { object } from "../common/Table/types";
import { TransactionRow } from "./TransactionRow";
export const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  return (
    <VStack align={"flex-start"}>
      <HStack w="100%" py={8} px={8} align="center">
        <Heading>Home</Heading>
        <Spacer />
        <Button
          colorScheme={useColorModeValue("lightGreen", "purple")}
          bg={useColorModeValue("lightGreen.500", "purple.500")}
          color="white"
        >
          Add a transaction
        </Button>
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
          px={[0, 24]}
        >
          {object.map((item) => (
            <TransactionRow transaction={item} />
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
};
