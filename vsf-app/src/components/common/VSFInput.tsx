import { Box, Input, InputProps } from "@chakra-ui/react";
import React from "react";

export interface VSFInputProps extends InputProps {
  error?: string;
  value?: string;
  ref?: React.MutableRefObject<null>;
}

export const VSFInput: React.FC<VSFInputProps> = (props) => {
  const { error, value, ...others } = props;
  const colorFocusBorder = "purple.400";

  return (
    <Box w="100%">
      <Input
        ref={props.ref}
        value={value}
        borderRadius={4}
        borderColor={error ? "red.500" : "grey.500"}
        focusBorderColor={error ? "red.500" : colorFocusBorder}
        _placeholder={{ weight: "400", color: "gray.400" }}
        padding={6}
        {...others}
      />
    </Box>
  );
};
