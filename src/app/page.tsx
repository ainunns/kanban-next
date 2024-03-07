import * as React from 'react';

import Typography from '@/components/Typography';

export default function Home() {
  return (
    <main className='w-full'>
      <Typography as='h1' variant='h5' weight='bold'>
        Kanban board
      </Typography>
    </main>
  );
}
