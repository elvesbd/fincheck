import { useForm } from 'react-hook-form';

export function useLogin() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
  } = useForm();

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log('enviando...')
    console.log(data)
  })

  return { handleSubmit, register }
}
