export interface UserContextinterface {
  user: UserInterface | null;
  didMount: boolean;
  setUser: (user: UserInterface | null) => void;
  login: (email: string, password: string) => Promise<void>;
  loginJWT: (clientJWT: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface UserInterface {
  id: string;
  username: string;
  firstName: string;
  hasLogin: boolean;
  lastName: string;
  bank: number;
  cash: number;
  isActive?: boolean;
  userRole: number;
  createdAt?: string;
}
