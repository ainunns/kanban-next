import * as React from 'react';
import { ImSpinner9 } from 'react-icons/im';

import Typography from '@/components/Typography';

export default function Loading() {
  return (
    <section className='flex min-h-screen w-full flex-col items-center justify-center'>
      <ImSpinner9 className='mb-4 animate-spin text-3xl text-primary-500' />
      <Typography variant='h6' className='text-typo-primary'>
        Loading...
      </Typography>
    </section>
  );
}
