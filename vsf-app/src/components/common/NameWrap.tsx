import { Box, Flex, FlexProps, HStack, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
interface NameWrapProp extends FlexProps {
  children: React.ReactNode;
  title: string;
  error?: string;
}
export const NameWrap: React.FC<NameWrapProp> = ({
  children,
  title,
  error,
  ...others
}) => {
  return (
    <Flex w="fit-content" direction={"column"} {...others}>
      <HStack>
        <Box w="fit-content" whiteSpace={"nowrap"}>
          {title}
        </Box>
        <Spacer />
        {error && <Box color="red.500">{error}</Box>}
      </HStack>
      <Box w="100%">{children}</Box>
    </Flex>
  );
};
