export interface LoginContextInterface {
  username: string;
  password: string;
  passwordToShow: string;
  handleShow: () => void;
  error: ErrorLoginForm;
  isLoading: boolean;
  handleLogin: () => void;
  setPasswordToShow: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleRegister: () => void;
  handleForgotPassword: () => void;
}
export interface ErrorLoginForm {
  username: string;
  password: string;
}
