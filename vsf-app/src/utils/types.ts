export interface UserContextinterface {
  user: UserInterface | null;
  didMount: boolean;
  setUser: (user: UserInterface | null) => void;
  login: (email: string, password: string) => Promise<void>;
  loginJWT: (clientJWT: string) => Promise<void>;
  logout: () => Promise<void>;
}
export type UserRole = "admin" | "user";
export interface UserInterface {
  id: string;
  firstName: string;
  hasLogin: boolean;
  lastName: string;
  bank: number;
  cash: number;
  userRole: UserRole;
}
