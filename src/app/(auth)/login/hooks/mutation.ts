import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiResponseUser } from '@/types/api';
import { UserType } from '@/types/entities/user';

export type LoginForm = {
  email: string;
  password: string;
};

export const useLoginMutation = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const {
    mutateAsync: handleLogin,
    isPending,
    isSuccess,
  } = useMutationToast<void, LoginForm>(
    useMutation({
      mutationFn: async (data: LoginForm) => {
        const response = await api.post('/user/login', data);
        const { accessToken } = response.data;
        setToken(accessToken);

        const user = await api.get<ApiResponseUser<UserType>>('/user');
        if (!user.data.user) {
          throw new Error('Sesi login tidak valid');
        }

        login({ ...user.data.user, token: accessToken });
      },
      onSuccess: () => {
        showToast('Akun berhasil login', SUCCESS_TOAST);
        router.push('/board');
      },
    }),
  );
  return { handleLogin, isPending, isSuccess };
};
