import { useAuth } from "../../../app/hooks"
import { Button } from "../../Components/Button";


export function Dashboard() {
  const { signout } = useAuth();

  return (
   <div>
      <h1>Dashboard</h1>
      <Button onClick={signout}>
        Sair
      </Button>
   </div>
  )
}
