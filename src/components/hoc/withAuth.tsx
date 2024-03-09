'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import Loading from '@/components/Loading';
import api from '@/lib/api';
import { getToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiResponseUser } from '@/types/api';
import { PermissionListArray } from '@/types/entities/permission-list';
import { UserType } from '@/types/entities/user';

type WithAuthProps = {
  user: UserType;
};

export default function withAuth<T>(
  Component: React.ComponentType<T>,
  permissions: PermissionListArray,
) {
  function ComponentWithAuth(props: Omit<T, keyof WithAuthProps>) {
    const router = useRouter();
    const pathname = usePathname();
    const redirect = useSearchParams().get('redirect');

    const { user, isAuthed, isLoading, login, logout, stopLoading } =
      useAuthStore();

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        isAuthed && logout();
        stopLoading();
        return;
      }

      const loadUser = async () => {
        try {
          const newUser = await api.get<ApiResponseUser<UserType>>('/user');
          if (!newUser) throw new Error('User tidak ditemukan');
          login({ ...newUser.data.user, token });
        } catch {
          logout();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthed) {
        loadUser();
      }
    }, [isAuthed, login, logout, stopLoading]);

    React.useEffect(() => {
      checkAuth();

      window.addEventListener('focus', checkAuth);

      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      const Redirect = async () => {
        if (isAuthed) {
          if (permissions.includes('authed')) {
            if (redirect) {
              router.replace(redirect as string);
            } else if (permissions.includes('user')) {
              router.replace(`/board?redirect=${pathname}`);
            }
          }
        } else {
          if (
            !permissions.includes('authed') &&
            !permissions.includes('user')
          ) {
            router.replace(`/login?redirect=${pathname}`);
          }
        }
      };
      if (!isLoading) {
        Redirect();
      }
    }, [isAuthed, isLoading, pathname, redirect, router]);

    if (
      (isLoading || !isAuthed) &&
      !permissions.includes('authed') &&
      !permissions.includes('user')
    )
      return <Loading />;

    return <Component {...(props as T)} user={user} />;
  }

  return ComponentWithAuth;
}
