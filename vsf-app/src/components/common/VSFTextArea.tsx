import { Box, Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";

interface VSFTextAreaProps extends Omit<TextareaProps, "onChange"> {
  error?: string;
  onChange: (value: string) => void;
  value: string;
}

export const VSFTextArea: React.FC<VSFTextAreaProps> = (props) => {
  const { value, onChange, error, ...others } = props;

  const changeEventHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  const colorFocusBorder = "purple.400";

  return (
    <Box w="100%" h="100%">
      <Textarea
        value={value}
        onChange={changeEventHandler}
        minHeight={100}
        borderRadius={4}
        borderColor={error ? "red.500" : "grey.500"}
        focusBorderColor={error ? "red.500" : colorFocusBorder}
        _placeholder={{ weight: "400", color: "gray.400" }}
        {...others}
      />
    </Box>
  );
};
