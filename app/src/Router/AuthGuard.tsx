import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();
  console.log({signedIn})

  if(!signedIn && isPrivate) {
    return <Navigate to='/login' replace />
  }

  if(signedIn && !isPrivate) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
