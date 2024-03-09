import * as React from 'react';
import { FaCalendar, FaEdit } from 'react-icons/fa';

import IconButton from '@/components/buttons/IconButton';
import Chips from '@/components/Chips';
import UnderlineLink from '@/components/links/UnderlineLink';
import Typography from '@/components/Typography';
import { randomColor, showFormattedDate } from '@/lib/helper';
import { taskType } from '@/types/entities/task';

export default function TicketBoard({ data }: { data: taskType | null }) {
  const tags = data?.tags;
  return (
    <div className='flex w-full flex-col gap-y-4 rounded-xl bg-typo-white p-4 shadow-md'>
      <div className='flex flex-row items-center justify-between gap-x-6'>
        <div className='flex flex-row flex-wrap gap-x-2'>
          {tags?.map((tag) => (
            <Chips key={tag} color={randomColor()} size='sm'>
              {tag}
            </Chips>
          ))}
        </div>
        <IconButton
          icon={FaEdit}
          variant='outline'
          iconClassName='size-4'
          className='border-2 border-primary-500 font-normal'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <UnderlineLink href={`/board/${data?._id}`} className='w-fit'>
          <Typography as='h3' variant='bt' weight='semibold'>
            {data?.title}
          </Typography>
        </UnderlineLink>
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
