'use client';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useLoginMutation } from '@/app/(auth)/login/hooks/mutation';
import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const methods = useForm<LoginForm>({
    mode: 'onTouched',
  });

  const { handleSubmit } = methods;

  const { handleLogin, isPending } = useLoginMutation();

  const onSubmit = (data: LoginForm) => {
    handleLogin({
      ...data,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <Input
          id='email'
          label='Email'
          placeholder='Masukkan Email'
          validation={{
            required: 'Email tidak boleh kosong!',
          }}
        />
        <Input
          id='password'
          type='password'
          label='Password'
          placeholder='Masukkan Password'
          validation={{
            required: 'Password tidak boleh kosong!',
          }}
        />
        <Button
          type='submit'
          variant='primary'
          className='w-full'
          isLoading={isPending}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
