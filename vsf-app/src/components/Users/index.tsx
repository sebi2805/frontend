import {
  Accordion,
  AccordionItem,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { UserRow } from "./UserRow";
import { useUser } from "./useUser";
export const UsersComponent: React.FC = () => {
  const { allUsers, deleteUser, toggleActive } = useUser();
  return (
    <>
      <VStack w="100%" px={16}>
        {" "}
        <HStack w="100%" py={8} align="center">
          <Heading>Home</Heading>
          <Spacer />
        </HStack>
        <Accordion pt={8} allowToggle w="100%">
          {allUsers.map((user) => {
            return (
              <AccordionItem
                key={user.id}
                bg="purple.700"
                mb={2}
                w="100%"
                borderRadius={12}
              >
                <UserRow
                  user={user}
                  deleteUser={deleteUser}
                  toggleUser={toggleActive}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </VStack>
    </>
  );
};
