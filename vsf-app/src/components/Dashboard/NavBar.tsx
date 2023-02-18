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
export const NavBarHeight: number = 16;
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
        pr={4}
      >
        {text}
      </Button>
    );
  };

  return (
    <HStack
      w="100%"
      h={NavBarHeight}
      fontWeight="bold"
      borderBottom={"1px solid"}
      bgGradient={useColorModeValue(
        "linear(to-r, lightGreen.200, lightGreen.500)",
        "linear(to-r, purple.500, purple.200)"
      )}
      borderColor={useColorModeValue("darkGreen.200", "purple.400")}
    >
      <Box cursor={"pointer"} onClick={() => handleClick("/home")}>
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
