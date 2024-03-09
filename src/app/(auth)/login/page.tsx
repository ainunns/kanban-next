import { Metadata } from 'next';
import * as React from 'react';

import LoginContainer from '@/app/(auth)/login/container/LoginPage';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return <LoginContainer />;
}
