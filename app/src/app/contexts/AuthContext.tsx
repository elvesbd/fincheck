import { createContext, useCallback, useEffect, useState } from "react";
import cookie from 'js-cookie';
import { cookieKeys } from "../config/cookieKeys";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../services/users";
import { toast } from "react-hot-toast";
import { PageLoader } from "../../view/Components/PageLoader";


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

 const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  const signin = useCallback((accessToken: string) => {
    cookie.set(cookieKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    cookie.remove(cookieKeys.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error('Sessão expirada!')
      signout();
    }
  }, [isError, signout]);

  if (isFetching) {
    return <PageLoader />
  }

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
