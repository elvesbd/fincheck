import { Link } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { useRegister } from "./useRegister";


export function Register() {
  const { handleSubmit, register, errors, isLoading } = useRegister();
  console.log('aqui', errors)


  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
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

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-2" action="">
        <Input
          type="name"
          placeholder="Nome"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          type="email"
          placeholder="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  )
}
