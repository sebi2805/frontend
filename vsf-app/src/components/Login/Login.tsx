import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { NameWrap } from "../common/NameWrap";
import { VSFButton } from "../common/VSFButton";
import { VSFInput } from "../common/VSFInput";
import { NavBarHeight } from "../Dashboard/NavBar";
import { useLogin } from "./useLogin";
export const Login: React.FC = () => {
  const {
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
    error,
    passwordToShow,
    handleShow,
    setPasswordToShow,
    handleForgotPassword,
    handleRegister,
    isLoading,
  } = useLogin();
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(
      e.target.value.length > password.length
        ? password + e.target.value.slice(-1)
        : password.slice(0, -1)
    );
    setPasswordToShow(e.target.value.replace(/./g, "*"));
  };

  return (
    <HStack
      maxH={`calc(100vh - ${NavBarHeight + 10}px)`}
      w="100%"
      spacing={0}
      h="100%"
    >
      <Box minW="fit-content" position={["absolute", "initial"]} top={0}>
        <Image
          src={"BannerPurple.png"}
          h={`calc(100vh - ${NavBarHeight + 49}px)`}
        />
      </Box>
      <Flex
        justify="center"
        w={["100%", "50%"]}
        pt={[16, 0]}
        px={[2, 0]}
        bg="transparent"
        zIndex={2}
      >
        <VStack
          bg="white"
          align="center"
          border="2px solid"
          borderColor={"purple.400"}
          borderRadius={4}
          p={4}
        >
          <Box fontSize={24} fontWeight={"bold"}>
            Login
          </Box>
          <Box>Enter your username and password to login</Box>
          <NameWrap title="Username" error={error.username} w="100%">
            <VSFInput
              value={username}
              error={error.username}
              onChange={handleChangeUsername}
              placeholder="Enter username"
            />
          </NameWrap>
          <NameWrap title="Password" error={error.password} pb={4} w="100%">
            <InputGroup>
              <VSFInput
                placeholder="Enter password"
                value={passwordToShow}
                error={error.password}
                onChange={handleChangePassword}
              />
              <InputRightElement>
                <Icon
                  mt={2}
                  as={ViewIcon}
                  onClick={handleShow}
                  h={6}
                  w={6}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
          </NameWrap>
          <VSFButton onClick={handleLogin} isLoading={isLoading} w="100%">
            Login
          </VSFButton>
          <HStack fontSize={12} spacing={0} justify="center">
            <Box pt={0.5}>*If you forgot you password click</Box>
            <Button
              p={0}
              variant={"link"}
              fontSize={12}
              onClick={handleForgotPassword}
              color={"purple.100"}
            >
              {" "}
              here.{" "}
            </Button>{" "}
          </HStack>
          <HStack fontSize={12} spacing={0} justify="center">
            <Box pt={0.5}>*Don't have an account? Sign up</Box>
            <Button
              p={0}
              onClick={handleRegister}
              variant={"link"}
              fontSize={12}
              color={"purple.100"}
            >
              {" "}
              here.{" "}
            </Button>{" "}
          </HStack>
        </VStack>
      </Flex>
    </HStack>
  );
};
