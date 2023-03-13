import { Grid, Heading, VStack } from "@chakra-ui/react";
import moment from "moment";
import React, { Fragment } from "react";
import { CustomSpinner } from "../common/CustomSpinner";
import { StatisticsCard } from "./StatisticsCard";
import { useStatistics } from "./useStatistics";
export const StatisticsComponent = () => {
  const { statistics, isLoading } = useStatistics();
  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <VStack pt={4}>
          <Heading w="100%" pl={32}>
            Statistics for {moment().format("yyyy")}
          </Heading>
          <Grid
            py={6}
            gridTemplateColumns={"1fr 1fr 1fr 1fr"}
            columnGap={4}
            rowGap={4}
          >
            {statistics.map((statistic) => {
              return (
                <Fragment key={statistic.id}>
                  <StatisticsCard statistic={statistic} />
                </Fragment>
              );
            })}
          </Grid>
        </VStack>
      )}
    </>
  );
};
