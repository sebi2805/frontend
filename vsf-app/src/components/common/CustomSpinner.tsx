import { Spinner, useColorModeValue } from "@chakra-ui/react";
import React from "react";
export const CustomSpinner: React.FC = () => {
  return <Spinner color={useColorModeValue("lightGreen.200", "purple.500")} />;
};
