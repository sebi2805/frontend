import {
  Box,
  VStack,
  useColorModeValue,
  Image,
  HStack,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { NameWrap } from "../common/NameWrap";

export const SideBar: React.FC = () => {
  const navigator = useNavigate();
  const { user } = useContext(UserContext);
  const image = useColorModeValue("GreenLogo.png", "PurpleLogo.png");
  const handleClick = (path: string) => navigator(path);
  const borderColor = useColorModeValue("darkGreen.200", "purple.10");
  return (
    <VStack
      bg={useColorModeValue("lightGreen.100", "purple.500")}
      h="100vh"
      w={64}
      display={["none", "flex"]}
      align="center"
      fontWeight={"bold"}
      borderRight={"1px solid"}
      borderColor={borderColor}
    >
      <Flex
        justify={"center"}
        cursor={"pointer"}
        onClick={() => handleClick("/home")}
        borderBottom="1px solid"
        borderColor={borderColor}
        w="100%"
      >
        <Box>
          <Image src={image} h={24} w={24} />
        </Box>
      </Flex>
      <Box>Hi, </Box>
      <Box> {user?.lastName}</Box>
      <Box>{user?.firstName}</Box>
      <Flex
        justify={"center"}
        borderTop="1px solid"
        borderColor={borderColor}
        w="100%"
        color="lightGreen.10"
        mb={2}
      >
        Your current account is:
      </Flex>
      <VStack w="100%" justify={"center"}>
        <NameWrap direction={"row"} title={"Bank:"}>
          {user?.bank} lei
        </NameWrap>
        <NameWrap direction={"row"} title={"Cash:"}>
          {user?.cash} lei
        </NameWrap>
        <NameWrap direction={"row"} title={"Total:"}>
          {(user?.cash || 0) + (user?.bank || 0)} lei
        </NameWrap>
      </VStack>
    </VStack>
  );
};
