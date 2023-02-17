import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
interface DashboardWrapperProps {
  children: React.ReactNode;
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
}) => {
  return (
    <HStack w="100%" align="flex-start" spacing={0}>
      <SideBar />
      <VStack overflow="hidden" h="100vh" width={"100%"} spacing={0}>
        <NavBar />
        <Box w="100%" h="100%" overflow={"auto"} position="relative">
          {children}
        </Box>
      </VStack>
    </HStack>
  );
};
