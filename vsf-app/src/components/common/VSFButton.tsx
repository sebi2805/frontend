import { Button, useColorModeValue } from "@chakra-ui/react";
import React from "react";
interface VSFButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
export const VSFButton: React.FC<VSFButtonProps> = ({ children, onClick }) => {
  return (
    <Button
      onClick={() => {
        onClick();
      }}
      colorScheme={useColorModeValue("lightGreen", "purple")}
      bg={useColorModeValue("lightGreen.500", "purple.500")}
      color="white"
    >
      {children}
    </Button>
  );
};
