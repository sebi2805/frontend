import { Box, Button, HStack, Image, Spacer } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
export const NavBarHeight: number = 16;
export const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const image = "PurpleLogo.png";
  const hoverColor = "purple.200";
  const handleClick = (path: string) => navigate(path);
  const NavBarItem = ({ path, text }: { path: string; text: string }) => {
    return (
      <Button
        variant={"link"}
        onClick={() => handleClick(path)}
        _hover={{ color: hoverColor, textDecoration: "underline" }}
        fontSize={[16, 20]}
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
      bgGradient={"linear(to-r, purple.500, purple.200)"}
      borderColor={"purple.400"}
    >
      <Box cursor={"pointer"} onClick={() => handleClick("/home")}>
        <Image src={image} h={16} w={16} />
      </Box>
      <Box display={["none", "flex"]} w={4}></Box>
      {user ? (
        <>
          <NavBarItem path="/home" text="Home" />
          <NavBarItem path="/history" text="History" />
          <NavBarItem path="/statistics" text="Statistics" />
        </>
      ) : (
        <>
          <NavBarItem path="/login" text="Login" />
          <NavBarItem path="/register" text="Register" />
        </>
      )}

      <Spacer />
    </HStack>
  );
};
