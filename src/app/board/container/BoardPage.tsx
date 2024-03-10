'use client';
import * as React from 'react';
import { FaGithub } from 'react-icons/fa';

import StatusBoard from '@/app/board/components/StatusBoard';
import { useGetTickets } from '@/app/board/hooks/query';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import Loading from '@/components/Loading';
import Typography from '@/components/Typography';

export default withAuth(BoardContainer, ['user']);
function BoardContainer() {
  const { boardData, isLoading, refetch } = useGetTickets();

  if (isLoading) {
    return <Loading />;
  }

  const unarchivedTickets =
    boardData && boardData.data
      ? boardData.data.tasks.filter((ticket) => !ticket.deletedAt)
      : [];

  const [backlogTickets, readyTickets, inProgressTickets, doneTickets] = [
    unarchivedTickets.filter((ticket) => ticket.status === 'backlog'),
    unarchivedTickets.filter((ticket) => ticket.status === 'ready'),
    unarchivedTickets.filter((ticket) => ticket.status === 'in progress'),
    unarchivedTickets.filter((ticket) => ticket.status === 'done'),
  ];

  return (
    <main className='my-16 flex min-h-screen w-full flex-col gap-8 bg-typo-surface'>
      <section className='mx-auto flex w-11/12 flex-col gap-2'>
        <Typography as='h1' variant='h5' color='primary-typo' weight='bold'>
          Kanban Board
        </Typography>
        <Typography
          as='p'
          variant='bt'
          color='icon'
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
        <StatusBoard title='Backlog' data={backlogTickets} refetch={refetch} />
        <StatusBoard title='Ready' data={readyTickets} refetch={refetch} />
        <StatusBoard
          title='In Progress'
          data={inProgressTickets}
          refetch={refetch}
        />
        <StatusBoard title='Done' data={doneTickets} refetch={refetch} />
      </section>
    </main>
  );
}
