import { User } from "../../services/users/interfaces";

export interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin: (accessToken: string) => void;
  signout: () => void;
}
