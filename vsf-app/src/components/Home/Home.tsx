import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Spacer,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Fragment, useContext, useEffect } from "react";
import { HomeContext } from ".";
import { UserContext } from "../../App";
import { CustomSpinner } from "../common/CustomSpinner";

import { TransactionModal } from "../common/VSFTransactionModal/VSFTransactionModal";
import { TransactionRow } from "./TransactionRow";
export const Home: React.FC = () => {
  const { user, loginJWT } = useContext(UserContext);
  const clientJWT = localStorage.getItem("clientJWT");
  const {
    transactions,
    submit,
    isLoading,
    id,
    handleDelete,
    handleEdit,
    setId,
  } = useContext(HomeContext);
  const [indexes, setIndexes] = React.useState<number[]>([]);
  const handleIndexChangeMobile = (index: number) => {
    if (indexes.includes(index)) {
      setIndexes(indexes.filter((i) => i !== index));
    } else {
      setIndexes([...indexes, index]);
    }
  };
  const handleIndexChangeDesktop = (index: number) => {
    if (indexes.includes(index)) {
      setIndexes(
        indexes.filter((i) => Math.floor(i / 2) !== Math.floor(index / 2))
      );
    } else {
      setIndexes([...indexes, index, index % 2 === 0 ? index + 1 : index - 1]);
    }
  };
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  useEffect(() => {
    loginJWT(clientJWT || "");
  }, [transactions]);
  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <VStack align={"flex-start"}>
            <HStack w="100%" py={8} px={16} align="center">
              <Heading>Home</Heading>
              <Spacer />
              <TransactionModal
                submitProps={submit}
                idProps={id}
                setIdProps={setId}
              />
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
                <Box pl={2}>
                  {"Today's date: " + moment().format("DD/MM/YYYY")}
                </Box>
              </VStack>
              <Spacer />
              <VStack align="center" pt={[4, 0]}>
                <Box> Your current account is:</Box>
                <HStack>
                  <Box> Bank: </Box>
                  <Box fontWeight={"bold"}> {user?.bank?.toFixed(1)}</Box>{" "}
                  <Box>RON</Box>
                </HStack>
                <HStack>
                  <Box> Cash:</Box>{" "}
                  <Box fontWeight={"bold"}>{user?.cash?.toFixed(1)} </Box>{" "}
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
            {transactions.length === 0 ? (
              <Heading
                w="100%"
                alignItems={"center"}
                display="flex"
                justifyContent={"center"}
              >
                <InfoOutlineIcon mr={2} /> You have no transaction in the last
                month!
              </Heading>
            ) : (
              <>
                <VStack w="100%" align="center" pb={20} pt={8}>
                  <Box fontSize={24} fontWeight={"bold"} pb={4}>
                    Transactions in the last month
                  </Box>
                  <Accordion
                    allowMultiple
                    defaultIndex={[]}
                    index={indexes}
                    w="100%"
                  >
                    <Grid
                      templateColumns={["1fr", "1fr", "1fr", "2fr 2fr"]}
                      w="100%"
                      rowGap={4}
                      columnGap={2}
                      px={[0, 16]}
                    >
                      {transactions.map((item, index) => (
                        <Fragment key={item.id + "transaction-row"}>
                          <AccordionItem
                            w="100%"
                            onClick={() => {
                              !isLargerThan1280
                                ? handleIndexChangeMobile(index)
                                : handleIndexChangeDesktop(index);
                            }}
                            border="2px solid"
                            pb={[2, 0]}
                            bg={item.type === 10 ? "lightGreen.1" : "red.10"}
                            borderRadius={12}
                          >
                            <TransactionRow
                              transaction={item}
                              handleDelete={handleDelete}
                              handleEdit={handleEdit}
                            />
                          </AccordionItem>
                        </Fragment>
                      ))}
                    </Grid>
                  </Accordion>
                </VStack>
              </>
            )}
          </VStack>
        </>
      )}
    </>
  );
};
