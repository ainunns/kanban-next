'use client';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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

  const onSubmit = (data: LoginForm) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
        <Button type='submit' variant='primary' className='w-full'>
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
