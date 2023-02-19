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
  showPasswords: ShowPasswords;
  setShowPasswords: (value: ShowPasswords) => void;
  showPassword: () => void;
  showConfirmPassword: () => void;
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
  passwordToShow: string;
  confirmPassword: string;
  confirmPasswordToShow: string;
}
export interface ShowPasswords {
  showPassword: boolean;
  showConfirmPassword: boolean;
}
