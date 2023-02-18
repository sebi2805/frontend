import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
}) => {
  return (
    <VStack overflow="hidden" h="100vh" width={"100%"} spacing={0}>
      <NavBar />
      <Box w="100%" h="100%" overflow={"auto"} position="relative">
        {children}
      </Box>
    </VStack>
  );
};
