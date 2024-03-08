import * as React from 'react';

import Chips from '@/components/Chips';
import ArrowLink from '@/components/links/ArrowLink';
import Typography from '@/components/Typography';

export default function Home() {
  return (
    <main className='w-full'>
      <ArrowLink href='/'>Go to the homepage</ArrowLink>
      <Chips color='primary'>Chips</Chips>
      <Typography as='h1' variant='h5' weight='bold'>
        Kanban board
      </Typography>
    </main>
  );
}
