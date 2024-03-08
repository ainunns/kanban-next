'use client';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import { REG_EMAIL, REG_PASS, REG_USERNAME } from '@/constant/regex';

type RegisterFormType = {
  username: string;
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const methods = useForm<RegisterFormType>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: RegisterFormType) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <Input
          id='username'
          label='Username'
          placeholder='Masukkan Username'
          validation={{
            required: 'Username tidak boleh kosong!',
            pattern: {
              value: REG_USERNAME,
              message: 'Username tidak valid!',
            },
          }}
          helperText='Username terdiri atas 3-15 karakter dan hanya boleh berisi huruf, angka, dan underscore.'
        />
        <Input
          id='name'
          label='Nama'
          placeholder='Masukkan Nama'
          validation={{
            required: 'Nama tidak boleh kosong!',
          }}
        />
        <Input
          id='email'
          label='Email'
          placeholder='Masukkan Email'
          validation={{
            required: 'Email tidak boleh kosong!',
            pattern: {
              value: REG_EMAIL,
              message: 'Username tidak valid!',
            },
          }}
        />
        <Input
          id='password'
          label='Password'
          placeholder='Masukkan Password'
          validation={{
            required: 'Password tidak boleh kosong!',
            pattern: {
              value: REG_PASS,
              message: 'Password tidak valid!',
            },
          }}
          helperText='Password terdiri atas minimal 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter spesial.'
        />
        <Button type='submit' variant='primary' className='w-full'>
          Register
        </Button>
      </form>
    </FormProvider>
  );
}
