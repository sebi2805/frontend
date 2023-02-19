import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";
interface VSFButtonProps extends ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
export const VSFButton: React.FC<VSFButtonProps> = ({
  children,
  onClick,
  ...others
}) => {
  return (
    <Button
      onClick={() => {
        onClick();
      }}
      colorScheme={useColorModeValue("lightGreen", "purple")}
      bg={useColorModeValue("lightGreen.500", "purple.500")}
      color="white"
      {...others}
    >
      {children}
    </Button>
  );
};
