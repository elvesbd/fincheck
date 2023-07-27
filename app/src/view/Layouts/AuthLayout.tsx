import illustration from '../../assets/illustration.png';
import { Logo } from '../Components/Logo';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center items-center p-8 relative">
        <img
          src={illustration}
          alt="Imagem de ilustração do dashboard"
          className="object-cover w-full h-full max-w-[600px] max-h-[750px] select-none rounded-[32px]"
        />

        <div className="max-w-[600px]  bottom-6 bg-white p-10 absolute rounded-b-[32px] text-red-500">
          <Logo />
          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor de tudo, totalmente grátis!
          </p>
        </div>
      </div>
    </div>
  )
}
