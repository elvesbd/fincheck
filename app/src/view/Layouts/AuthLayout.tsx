import illustration from '../../assets/illustration.png'

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

        <div className="max-w-[600px] bg-white p-10 absolute rounded-b-[32px] bottom-8">
          <p>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor de tudo, totalmente grátis!
          </p>
        </div>
      </div>
    </div>
  )
}
