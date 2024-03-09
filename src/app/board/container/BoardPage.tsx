'use client';
import * as React from 'react';
import { FaGithub } from 'react-icons/fa';

import StatusBoard from '@/app/board/components/StatusBoard';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/Typography';

export default withAuth(BoardContainer, ['user']);
function BoardContainer() {
  return (
    <main className='my-16 flex min-h-screen w-full flex-col gap-8 bg-typo-surface'>
      <section className='mx-auto flex w-11/12 flex-col gap-2'>
        <Typography as='h1' variant='h5' color='primary-typo' weight='bold'>
          Kanban Board
        </Typography>
        <Typography
          as='p'
          variant='bt'
          color='inline'
          weight='regular'
          className='flex items-end gap-1'
        >
          A board to keep track of projects and tasks. Built with Next.js,
          TypeScript, and Tailwind CSS by{' '}
          <PrimaryLink href='https://github.com/ainunns'>
            <FaGithub /> {'ainunns'}
          </PrimaryLink>
        </Typography>
      </section>
      <section className='mx-auto grid w-11/12 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatusBoard title='Backlog' ticketCount={5} />
        <StatusBoard title='Ready' ticketCount={15} />
        <StatusBoard title='In Progress' ticketCount={5} />
        <StatusBoard title='Done' ticketCount={5} />
      </section>
    </main>
  );
}
