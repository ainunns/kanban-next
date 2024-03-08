import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/api';

export type RegisterForm = {
  username: string;
  name: string;
  email: string;
  password: string;
  language: string;
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const {
    mutateAsync: handleRegister,
    isPending,
    isSuccess,
  } = useMutationToast<void, RegisterForm>(
    useMutation({
      mutationFn: async (data: RegisterForm) => {
        await api.post('/user', data);
      },
      onSuccess: () => {
        showToast('Pendaftaran akun berhasil', SUCCESS_TOAST);
        router.push('/login');
      },
    }),
  );
  return { handleRegister, isPending, isSuccess };
};
