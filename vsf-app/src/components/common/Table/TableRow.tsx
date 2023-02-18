import { Td, Tr } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { DepositType, TransactionInterface } from "./types";
export interface TableRowProps {
  transaction: TransactionInterface;
}
export const TableRow: React.FC<TableRowProps> = ({ transaction }) => {
  return (
    <Tr bg={transaction.type === 10 ? "green.10" : "red.100"}>
      <Td>{moment(transaction.date).format("DD/MM/YYYY")}</Td>
      <Td>{DepositType[`${transaction.deposit}`]}</Td>
      <Td isNumeric>{transaction.amount} RON</Td>
      <Td isNumeric>{transaction.currentAmountBank} RON</Td>
      <Td isNumeric>{transaction.currentAmountCash} RON</Td>
    </Tr>
  );
};
