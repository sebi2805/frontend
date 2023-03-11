import {
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { UserInterface } from "../../utils/types";
import { NameWrap } from "../common/NameWrap";
import { ReactComponent as UserIcon } from "../../Assets/Icons/User.svg";
import moment from "moment";
import { ReactComponent as Options } from "../../Assets/Icons/Options.svg";
interface UserRowInterface {
  user: UserInterface;
  deleteUser: (id: string) => void;
  toggleUser: (id: string) => void;
}
export const UserRow: React.FC<UserRowInterface> = ({
  user,
  deleteUser,
  toggleUser,
}) => {
  return (
    <>
      <AccordionButton w="100%" color="white">
        <Flex
          //         display={["none", "flex"]}
          direction={["column", "row"]}
          w="100%"
          align={["center", "flex-start"]}
          justify={"space-between"}
        >
          <NameWrap title="">
            <Icon as={UserIcon} boxSize={8} />
          </NameWrap>
          <NameWrap
            ml={[0, 2]}
            direction={["row", "column"]}
            title="Name"
            w={["80%", "50%"]}
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {user.username}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Date"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {moment(user.createdAt).format("DD/MM/YYYY")}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Last Name"
            w={["80%", "50%"]}
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {user.lastName}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="First name"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {user.firstName}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Has Login"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {user.hasLogin ? "Yes" : "No"}
            </Text>
          </NameWrap>
          <NameWrap
            direction={["row", "column"]}
            title="Is active"
            w="80%"
            fontWeight={"bold"}
          >
            <Text textAlign={["end", "start"]} pr={2}>
              {user.isActive ? "Yes" : "No"}
            </Text>
          </NameWrap>
        </Flex>
        <Menu>
          <MenuButton as={Box} cursor={"pointer"}>
            <Icon as={Options} boxSize={8} />
          </MenuButton>
          <MenuList bg="white">
            <MenuItem
              bg="white"
              color="purple.700"
              _hover={{ bg: "purple.10" }}
              onClick={() => toggleUser(user.id || "")}
            >
              Toggle Active
            </MenuItem>

            <MenuItem
              color="red.500"
              bg="white"
              _hover={{ bg: "purple.10" }}
              onClick={() => deleteUser(user.id || "")}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </AccordionButton>
      <AccordionPanel>
        <></>
      </AccordionPanel>
    </>
  );
};
