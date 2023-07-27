import { Link } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";

export function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          Crie sua conta
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <Link to="/login" className="tracking-[-0.5px] font-medium text-teal-900">
            Fazer Login
          </Link>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-2" action="">
        <Input
          type="name"
          name="name"
          id=""
          placeholder="Nome"
        />
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
          Criar conta
        </Button>
      </form>
    </>
  )
}
