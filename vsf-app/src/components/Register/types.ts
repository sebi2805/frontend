export interface RegisterContextInterface {
  username: string;
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  passwords: RegisterPassword;
  setPasswords: (value: RegisterPassword) => void;
  error: ErrorRegisterForm;
  setError: (value: ErrorRegisterForm) => void;
  isLoading: boolean;
  handleRegister: () => void;
  setUsername: (value: string) => void;
  handleLogin: () => void;
}

export interface ErrorRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | undefined;
}
export interface RegisterPassword {
  password: string;
  confirmPassword: string;
}
