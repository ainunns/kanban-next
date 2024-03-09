'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import Loading from '@/components/Loading';
import api from '@/lib/api';
import { getToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiResponseUser } from '@/types/api';
import { PermissionListArray } from '@/types/entities/permission-list';
import { UserType } from '@/types/entities/user';

import { DANGER_TOAST, showToast } from '../Toast';

async function getUser() {
  const res = await api.get<ApiResponseUser<UserType>>('/user');
  return res.data.user;
}

type WithAuthProps = {
  user: UserType;
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  permissions: PermissionListArray,
) {
  function ComponentWithAuth(props: Omit<T, keyof WithAuthProps>) {
    const router = useRouter();

    const { user, isAuthed, isLoading, login, logout, stopLoading } =
      useAuthStore();

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        isAuthed && logout();
        stopLoading();
        return;
      }

      if (isAuthed) {
        stopLoading();
        return;
      }

      try {
        const newUser = await getUser();
        login({ ...newUser, token });
      } catch {
        logout();
      } finally {
        stopLoading();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed]);

    React.useEffect(() => {
      if (
        isLoading ||
        permissions.includes('all') ||
        (permissions.includes('authed') && isAuthed)
      ) {
        return;
      }

      if (!isAuthed || (user && !permissions.some((p) => p === user.type))) {
        showToast('Anda tidak memiliki akses ke halaman ini', DANGER_TOAST);
        router.replace('/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed, isLoading]);

    React.useEffect(() => {
      checkAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loading />;
    else if (!isLoading && !isAuthed) {
      router.replace('/login');
      return;
    }
    return <Component {...(props as T)} user={user} />;
  }

  return ComponentWithAuth;
}
