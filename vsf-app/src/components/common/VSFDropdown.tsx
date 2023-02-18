import {
  Box,
  Select,
  SelectProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { theme } from "../../theme";
export interface SelectOptionsInterface {
  value: string;
  display: string;
}

interface VSFSelectProps extends Omit<SelectProps, "onChange"> {
  onChange: (val: string) => void;
  error?: string;
  options: SelectOptionsInterface[];
  value: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export const VSFDropdown: React.FC<VSFSelectProps> = (props) => {
  const {
    isDisabled,
    placeholder,
    defaultValue,
    onChange,
    options,
    error,
    value,

    ...others
  } = props;
  const [selectValue, setSelectValue] = useState<string>(value);

  const colorFocusBorder = useColorModeValue("lightGreen.800", "purple.400");

  const bgOptionColor = useColorModeValue("white", `${theme.colors.grey[100]}`);
  const colorBackGround = useColorModeValue("white", "grey.100");
  const [didMount, setDidMount] = useState<boolean>(false);

  const changeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (didMount && e.target.value !== value) {
      if (
        options.filter((option) => {
          return e.target.value === option.value;
        })[0]
      ) {
        onChange(
          options.filter((option) => {
            return e.target.value === option.value;
          })[0].value
        );
      }
    }
  };

  useEffect(() => {
    setSelectValue(value);
  }, [value]);
  useEffect(() => {
    const optionsValues = options.map((op) => {
      return op.value;
    });

    if (!optionsValues.includes(selectValue)) {
      setSelectValue("");
    }

    setDidMount(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return didMount ? (
    <Box w="100%" h="100%">
      <Select
        bg={colorBackGround}
        size={"lg"}
        _disabled={{ color: "black" }}
        _placeholder={{ color: "black" }}
        focusBorderColor={error ? "red.500" : colorFocusBorder}
        borderColor={error ? "red.500" : "gray.300"}
        fontSize={16}
        disabled={isDisabled ?? false}
        iconColor="black"
        value={value}
        onChange={changeEventHandler}
        {...others}
      >
        <option style={{ display: "none" }} value={"none"}>
          {placeholder ?? "Nimic"}
        </option>
        {options.map((op) => {
          return (
            <option
              value={op.value}
              key={op.value}
              style={{
                background: bgOptionColor,
                fontWeight: "500",
              }}
            >
              {op.display}
            </option>
          );
        })}
      </Select>
    </Box>
  ) : null;
};
