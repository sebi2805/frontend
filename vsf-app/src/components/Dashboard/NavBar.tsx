import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
export const NavBarHeight: number = 28;
export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const image = useColorModeValue("GreenLogo.png", "PurpleLogo.png");
  const hoverColor = useColorModeValue("darkGreen.200", "purple.200");
  const handleClick = (path: string) => navigate(path);
  const NavBarItem = ({ path, text }: { path: string; text: string }) => {
    return (
      <Button
        variant={"link"}
        onClick={() => handleClick(path)}
        _hover={{ color: hoverColor, textDecoration: "underline" }}
        fontSize={20}
      >
        {text}
      </Button>
    );
  };

  return (
    <HStack
      w="100%"
      h={NavBarHeight}
      bg={useColorModeValue("lightGreen.100", "purple.500")}
      fontWeight="bold"
      borderBottom={"1px solid"}
      borderColor={useColorModeValue("darkGreen.200", "purple.10")}
    >
      <Box
        cursor={"pointer"}
        display={["flex", "none"]}
        onClick={() => handleClick("/home")}
      >
        <Image src={image} h={16} w={16} />
      </Box>
      <Box display={["none", "flex"]} w={4}></Box>
      <NavBarItem path="/home" text="Home" />
      <NavBarItem path="/history" text="History" />
      <NavBarItem path="/statistics" text="Statistics" />

      <Spacer />
      <Box onClick={toggleColorMode}>
        <IconButton
          aria-label="ColorModeIcon"
          icon={
            colorMode === "light" ? (
              <MoonIcon color="purple.500" boxSize={6} />
            ) : (
              <SunIcon color="green.200" boxSize={6} />
            )
          }
          mr={4}
        />
      </Box>
    </HStack>
  );
};
