import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { TableRow } from "./TableRow";
import { TransactionInterface } from "./types";
export interface LatestTransactionProp {
  transactions: TransactionInterface[];
}
export const LatestTransaction: React.FC<LatestTransactionProp> = ({
  transactions,
}) => {
  return (
    <>
      <TableContainer w="100%" px={24}>
        <Table variant={"simple"} bg="white" w="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Current bank</Th>
              <Th isNumeric>Current cash</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <TableRow transaction={transaction} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
