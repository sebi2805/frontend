import { Box, Flex, VStack } from "@chakra-ui/react";
import React from "react";
export const NotFoundPage: React.FC = () => {
  return (
    <VStack
      fontSize={[16, 32]}
      align="center"
      justify="center"
      h="100%"
      w="100%"
      color="purple.500"
    >
      <Box fontSize={[40, 120]}> 404</Box>
      <Box w="60%" textAlign={"center"}>
        The page you are looking for does not exist. Please check the URL and
        try again.
      </Box>
    </VStack>
  );
};
