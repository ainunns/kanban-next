import { Metadata } from 'next';
import * as React from 'react';

import RegisterContainer from '@/app/(auth)/register/container/RegisterPage';

export const metadata: Metadata = {
  title: 'Register',
};
export default function RegisterPage() {
  return <RegisterContainer />;
}
