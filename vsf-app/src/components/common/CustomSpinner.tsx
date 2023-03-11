import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
export const CustomSpinner: React.FC = () => {
  return (
    <Box h={12} overflow="hidden">
      <Spinner color={"purple.500"} size={"xl"} />;
    </Box>
  );
};
