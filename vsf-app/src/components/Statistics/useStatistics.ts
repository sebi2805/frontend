import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { apiClient, authorise } from "../../apiClient";
import { ErrorContext } from "../../App";
import { StatisticsContextInterface, StatisticsInterface } from "./types";

export const useStatistics = (): StatisticsContextInterface => {
  const { createError, createToast } = useContext(ErrorContext);
  const [statistics, setStatistics] = useState<StatisticsInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getData = async () => {
    await apiClient
      .get(
        `/api/Statistics/get-statistics?year=${moment().format("yyyy")}`,
        authorise()
      )
      .then((response) => {
        setStatistics(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        createError(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return {
    statistics,
    isLoading,
  };
};
