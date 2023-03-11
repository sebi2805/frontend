import { UserInterface } from "../../utils/types";

export interface AllUsersContextInterface {
  allUsers: UserInterface[];
  toggleActive: (id: string) => void;
  deleteUser: (id: string) => void;
}
