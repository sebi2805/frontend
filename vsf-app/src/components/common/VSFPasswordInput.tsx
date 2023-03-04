import { ViewIcon } from "@chakra-ui/icons";
import {
  Icon,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { VSFInput } from "./VSFInput";
export interface VSFPasswordInputProps extends InputProps {
  error?: string;
  password: string;
  ref?: React.MutableRefObject<null>;
  handlePasswordChange: (password: string) => void;
}
export const VSFPasswordInput: React.FC<VSFPasswordInputProps> = ({
  error,
  password,
  handlePasswordChange,
}) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [passwordToShow, setPasswordToShow] = React.useState<string>("");
  const handleShow = () => {
    setShow(!show);
    if (show) setPasswordToShow(password);
    else setPasswordToShow(password.replace(/./g, "*"));
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePasswordChange(
      e.target.value.length > password.length
        ? password + e.target.value.slice(-1)
        : password.slice(0, e.target.value.length - password.length)
    );
    setPasswordToShow(e.target.value.replace(/./g, "*"));
  };
  return (
    <InputGroup>
      <VSFInput
        placeholder="Enter password"
        value={passwordToShow}
        error={error}
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
  );
};
