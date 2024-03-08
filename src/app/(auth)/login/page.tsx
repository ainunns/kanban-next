import { Metadata } from 'next';
import * as React from 'react';

import LoginForm from '@/app/(auth)/login/container/LoginForm';
import PrimaryLink from '@/components/links/PrimaryLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';

export const metadata: Metadata = {
  title: 'Login',
};

export default function RegisterPage() {
  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center'>
      <div className='mx-auto flex w-10/12 flex-row items-center justify-between'>
        <section className='flex w-full flex-col gap-12 lg:w-2/5'>
          <Typography variant='h3' color='primary-typo' weight='semibold'>
            Sign In
          </Typography>
          <LoginForm />
          <Typography variant='c1' color='secondary' weight='regular'>
            Belum punya akun?{' '}
            <PrimaryLink href='/register'>Register</PrimaryLink>
          </Typography>
        </section>
        <section className='hidden w-2/5 lg:block'>
          <NextImage
            src='/auth/sign-up.png'
            alt='hero'
            width='609'
            height='575'
            className='mx-auto w-[90%]'
          />
        </section>
      </div>
    </main>
  );
}
