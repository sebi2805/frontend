import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { CustomSpinner } from "../common/CustomSpinner";
export const Default: React.FC = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/")
      if (user) {
        if (user.userRole === 10) navigate("/users");
        else navigate("/home");
      } else {
        navigate("/login");
      }
  }, []);

  return (
    <>
      <Flex w="100%" h="100%" align="center" justify={"center"}>
        <CustomSpinner />
      </Flex>
    </>
  );
};
