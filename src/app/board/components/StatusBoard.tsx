import * as React from 'react';
import { FaPlus } from 'react-icons/fa';

import TicketBoard from '@/app/board/components/TicketBoard';
import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { taskType } from '@/types/entities/task';

import AddTicketModal from '../container/modal/AddTicketModal';

type StatusBoardProps = {
  title: string;
  data: taskType[] | null;
  refetch: () => void;
};

export default function StatusBoard({
  title,
  data,
  refetch,
}: StatusBoardProps) {
  const ticketCount = data?.length;
  return (
    <div
      className={clsxm(
        'flex h-[70vh] w-full flex-col gap-y-3 rounded-xl border-t-[12px] bg-typo-light',
        title === 'Backlog' && 'border-primary-300',
        title === 'Ready' && 'border-success-300',
        title === 'In Progress' && 'border-warning-300',
        title === 'Done' && 'border-danger-300',
      )}
    >
      <div className='flex w-full flex-row items-center justify-between p-4'>
        <div className='flex flex-row items-center gap-x-3'>
          <Typography as='h2' variant='t' weight='semibold'>
            {title}
          </Typography>
          <Typography
            variant='c1'
            weight='regular'
            className={clsxm(
              'inline rounded-md px-2 py-1',
              title === 'Backlog' &&
                'bg-primary-300 hover:bg-primary-400 active:bg-primary-400',
              title === 'Ready' &&
                'bg-success-300 hover:bg-success-400 active:bg-success-400',
              title === 'In Progress' &&
                'bg-warning-300 hover:bg-warning-400 active:bg-warning-400',
              title === 'Done' &&
                'bg-danger-300 hover:bg-danger-400 active:bg-danger-400',
            )}
          >
            {ticketCount}
          </Typography>
        </div>
        <AddTicketModal refetch={refetch} status={title}>
          {({ openModal }) => (
            <IconButton
              icon={FaPlus}
              variant='outline'
              className={clsxm(
                'size-4 border-none font-normal',
                title === 'Backlog' &&
                  'bg-primary-300 hover:bg-primary-400 active:bg-primary-400',
                title === 'Ready' &&
                  'bg-success-300 hover:bg-success-400 active:bg-success-400',
                title === 'In Progress' &&
                  'bg-warning-300 hover:bg-warning-400 active:bg-warning-400',
                title === 'Done' &&
                  'bg-danger-300 hover:bg-danger-400 active:bg-danger-400',
              )}
              onClick={openModal}
            />
          )}
        </AddTicketModal>
      </div>
      <div className='flex w-full flex-col gap-y-3 overflow-y-auto px-4 pb-4'>
        {data?.map((task) => (
          <TicketBoard key={task._id} data={task} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}
