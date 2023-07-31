import { createContext, useCallback, useState } from "react";
import cookie from 'js-cookie';
import { cookieKeys } from "../config/cookieKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users";


interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
  signout: () => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: {children: React.ReactNode}) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = cookie.get(cookieKeys.ACCESS_TOKEN)
    return !!storedAccessToken;
  });

 useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
  });

  const signin = useCallback((accessToken: string) => {
    cookie.set(cookieKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    cookie.remove(cookieKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
