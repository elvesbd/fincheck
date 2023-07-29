import { createContext, useCallback, useState } from "react";
import cookie from 'js-cookie';
import { cookieKeys } from "../config/cookieKeys";


interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: {children: React.ReactNode}) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = cookie.get(cookieKeys.ACCESS_TOKEN)
    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    cookie.set(cookieKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin }}>
      {children}
    </AuthContext.Provider>
  )
}
