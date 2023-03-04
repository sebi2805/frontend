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
import { isEmpty } from "../../utils/helpers";
import { NameWrap } from "../common/NameWrap";
import { VSFButton } from "../common/VSFButton";
import { VSFInput } from "../common/VSFInput";
import { VSFPasswordInput } from "../common/VSFPasswordInput";
import { NavBarHeight } from "../Dashboard/NavBar";
import { useRegister } from "./useRegister";
export const Register: React.FC = () => {
  const {
    firstName,
    lastName,
    setFirstName,
    setLastName,
    handleRegister,
    username,
    passwords,
    setUsername,
    setPasswords,
    error,
    setError,
    handleLogin,
    isLoading,
  } = useRegister();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError({ ...error, username: isEmpty(e.target.value) });
  };
  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);

    setError({ ...error, firstName: isEmpty(e.target.value) });
  };
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    setError({ ...error, lastName: isEmpty(e.target.value) });
  };
  const handlePasswordChange = (e: string) => {
    setPasswords({ ...passwords, password: e });
    setError({ ...error, password: isEmpty(e) });
  };

  const handleConfirmPasswordChange = (e: string) => {
    setPasswords({ ...passwords, confirmPassword: e });
    setError({ ...error, confirmPassword: isEmpty(e) });
  };

  return (
    <HStack maxH={`calc(100vh - ${NavBarHeight + 10}px)`} w="100%" spacing={0}>
      <Box minW="fit-content" position={["absolute", "initial"]} top={0}>
        <Image
          src={"BannerPurple.png"}
          h={`calc(100vh - ${NavBarHeight + 49}px)`}
        />
      </Box>
      <Flex
        justify="center"
        pt={20}
        w={["100%", "50%"]}
        bg="transparent"
        maxH={"80vh"}
        px={[2, 0]}
        zIndex={2}
      >
        <VStack
          bg="white"
          overflow={"auto"}
          align="center"
          position={"relative"}
          border="2px solid"
          borderColor={"purple.400"}
          borderRadius={4}
          // p={4}
        >
          <Flex
            p={4}
            position="sticky"
            top={0}
            w="100%"
            direction="column"
            align={"center"}
            bg="white"
            zIndex={2}
          >
            <Box fontSize={24} fontWeight={"bold"}>
              Register
            </Box>
            <Box>Enter your username and password to register</Box>
          </Flex>
          <NameWrap title="Username" error={error.username} w="90%">
            <VSFInput
              value={username}
              error={error.username}
              onChange={handleChangeUsername}
              placeholder="Enter username"
            />
          </NameWrap>
          <NameWrap title="Firstname" error={error.firstName} w="90%">
            <VSFInput
              value={firstName}
              error={error.username}
              onChange={handleChangeFirstName}
              placeholder="Enter Firstname"
            />
          </NameWrap>
          <NameWrap title="Lastname" error={error.lastName} w="90%">
            <VSFInput
              value={lastName}
              error={error.lastName}
              onChange={handleChangeLastName}
              placeholder="Enter username"
            />
          </NameWrap>
          <NameWrap title="Password" error={error.password} pb={4} w="90%">
            <VSFPasswordInput
              password={passwords.password}
              handlePasswordChange={handlePasswordChange}
              error={error.password}
            />
          </NameWrap>
          <NameWrap
            title="Confirm Password"
            error={error.confirmPassword}
            pb={4}
            w="90%"
          >
            <VSFPasswordInput
              password={passwords.confirmPassword}
              handlePasswordChange={handleConfirmPasswordChange}
              error={error.confirmPassword}
            />
          </NameWrap>
          <Flex
            position={"sticky"}
            bottom="0"
            bg="white"
            align="center"
            direction={"column"}
            w="100%"
          >
            <VSFButton
              onClick={handleRegister}
              isLoading={isLoading}
              w="90%"
              py={2}
            >
              Register
            </VSFButton>

            <Box pt={0.5} pb={2} fontSize={12} display="inline-block">
              *You already have an account? Login
              <Button
                display="inline-block"
                p={0}
                onClick={handleLogin}
                variant={"link"}
                fontSize={12}
                color={"purple.100"}
              >
                {" "}
                here.{" "}
              </Button>{" "}
            </Box>
          </Flex>
        </VStack>
      </Flex>
    </HStack>
  );
};
