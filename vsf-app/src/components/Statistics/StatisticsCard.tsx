import { Box, GridItem, VStack } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { NameWrap } from "../common/NameWrap";
import { StatisticsInterface } from "./types";
interface StatisticsCardProps {
  statistic: StatisticsInterface;
}
export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  statistic,
}) => {
  return (
    <>
      <GridItem
        border="3px solid"
        borderColor={
          statistic.changePercent > 0
            ? "green.500"
            : statistic.changePercent === 0
            ? "grey.300"
            : "red.500"
        }
        bg={
          statistic.changePercent > 0
            ? "green.100"
            : statistic.changePercent === 0
            ? "grey.100"
            : "red.100"
        }
        borderRadius={12}
      >
        <VStack align={"flex-start"} p={4}>
          <Box
            w="100%"
            fontWeight={"bold"}
            fontSize={24}
            borderBottom={"3px solid"}
            borderColor={
              statistic.changePercent > 0
                ? "green.500"
                : statistic.changePercent === 0
                ? "grey.300"
                : "red.500"
            }
          >
            {moment(statistic.date).format("MMMM yyyy")}
          </Box>
          <NameWrap title="Total Expenses">
            <Box>{statistic.totalExpenses} RON</Box>
          </NameWrap>
          <NameWrap title="Total Incomes">
            <Box>{statistic.totalIncomes} RON</Box>
          </NameWrap>
          <NameWrap title="Total Cash">
            <Box>{statistic.currentBank} RON</Box>
          </NameWrap>
          <NameWrap title="Total Bank">
            <Box>{statistic.currentCash} RON</Box>
          </NameWrap>
          <NameWrap title="Change percentage">
            <Box>{statistic.changePercent}%</Box>
          </NameWrap>
        </VStack>
      </GridItem>
    </>
  );
};
