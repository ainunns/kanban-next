import * as React from 'react';
import { FaCalendar, FaEdit } from 'react-icons/fa';

import DetailModal from '@/app/board/container/modal/DetailModal';
import EditTicketModal from '@/app/board/container/modal/EditTicketModal';
import IconButton from '@/components/buttons/IconButton';
import Chips from '@/components/Chips';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { randomColor, showFormattedDate } from '@/lib/helper';
import { taskType } from '@/types/entities/task';

type TicketBoardProps = {
  data: taskType | null;
  refetch: () => void;
};

export default function TicketBoard({ data, refetch }: TicketBoardProps) {
  const tags = data?.tags;
  return (
    <div className='flex w-full flex-col gap-y-3 rounded-xl bg-typo-white p-4 shadow-md'>
      <div className='flex flex-row items-center justify-between gap-x-6'>
        <div className='flex flex-row flex-wrap gap-x-2'>
          {tags?.map((tag) => (
            <Chips key={tag} color={randomColor()} size='sm'>
              {tag}
            </Chips>
          ))}
        </div>
        <EditTicketModal refetch={refetch} data={data}>
          {({ openModal }) => (
            <IconButton
              icon={FaEdit}
              variant='outline'
              iconClassName='size-4'
              className='border-2 border-primary-500 font-normal'
              onClick={openModal}
            />
          )}
        </EditTicketModal>
      </div>
      <div className='flex flex-col gap-1'>
        <DetailModal data={data} refetch={refetch}>
          {({ openModal }) => (
            <Typography
              as='h3'
              variant='bt'
              weight='semibold'
              className={clsxm(
                'animated-underline custom-link inline-flex w-fit items-center font-medium',
                'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                'border-dark border-b border-dotted hover:cursor-pointer hover:border-black/0',
              )}
              onClick={openModal}
            >
              {data?.title}
            </Typography>
          )}
        </DetailModal>
        <Typography variant='c1' weight='regular' color='icon'>
          {data?.description}
        </Typography>
      </div>
      <div className='flex flex-row items-center gap-2'>
        <FaCalendar className='size-4 text-typo-icon' />
        <Typography variant='c1' weight='regular' color='secondary'>
          {showFormattedDate(data?.dueDate ?? new Date())}
        </Typography>
      </div>
    </div>
  );
}
