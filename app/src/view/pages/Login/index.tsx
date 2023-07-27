import { Link } from "react-router-dom";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";

export function Login() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Entre em sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <Link to="/register" className="tracking-[-0.5px] font-medium text-teal-900">
            Crie uma conta
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-2" action="">
        <Input
          type="email"
          name="email"
          id=""
          placeholder="E-mail"
        />
        <Input
          type="password"
          name="password"
          id=""
          placeholder="Senha"
        />

        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </>
  )
}