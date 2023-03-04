export interface LoginContextInterface {
  username: string;
  password: string;
  error: ErrorLoginForm;
  isLoading: boolean;
  handleLogin: () => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleRegister: () => void;
  setError: (value: ErrorLoginForm) => void;
  handleForgotPassword: () => void;
}

export interface ErrorLoginForm {
  username: string;
  password: string;
}
