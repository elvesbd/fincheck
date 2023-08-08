import * as z from 'zod';
import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';


const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório!'),
  name: z.string().nonempty('Nome da conta é obrigatório!'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], {required_error: 'Selecione o tipo da conta!'}),
  color: z.string().nonempty('Cor é obrigatória!')
})

type FormData = z.infer<typeof schema>;

export function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control
   } = useForm<FormData>({
    resolver: zodResolver(schema)
   });

   const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log(data);
    } catch (error) {
      toast.error('')
    }
   })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    handleSubmit,
    control,
    errors,
  }
}

