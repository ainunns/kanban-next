import * as React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';

import { useDeleteTicketMutation } from '@/app/board/hooks/mutation';
import Button from '@/components/buttons/Button';
import Chips from '@/components/Chips';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import { randomColor, showFormattedDate } from '@/lib/helper';
import { taskType } from '@/types/entities/task';

type ModalReturnType = {
  openModal: () => void;
};

export default function DetailTicketModal({
  data,
  refetch,
  children,
}: {
  data: taskType | null;
  refetch: () => void;
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const { handleDelete, isPending } = useDeleteTicketMutation({
    id: data?._id ?? '',
    setOpen,
    refetch,
  });

  return (
    <>
      {children(modalReturn)}
      <Modal
        open={open}
        setOpen={setOpen}
        title='Detail Ticket'
        titleClassName='font-semibold'
      >
        <Modal.Section className='flex flex-col gap-6'>
          <div className='flex flex-row items-center justify-between gap-x-2.5'>
            <div className='flex flex-col gap-y-2'>
              <Typography variant='t' weight='semibold'>
                {data?.title}
              </Typography>
              <div className='flex flex-row items-center gap-x-2'>
                <div className='flex flex-row items-center gap-x-1'>
                  <GrStatusGood className='size-[14px] text-success-500' />
                  <Typography
                    variant='c1'
                    color='secondary'
                    className='capitalize'
                  >
                    {data?.status}
                  </Typography>
                </div>
                <div className='flex flex-row items-center gap-x-1'>
                  <FaCalendar className='size-[14px] text-typo-primary' />
                  <Typography
                    variant='c1'
                    color='secondary'
                    className='capitalize'
                  >
                    {showFormattedDate(data?.dueDate ?? new Date())}
                  </Typography>
                </div>
              </div>
            </div>
            <div className='flex flex-row flex-wrap gap-x-2'>
              {data?.tags.map((tag) => (
                <Chips key={tag} color={randomColor()} size='sm'>
                  {tag}
                </Chips>
              ))}
            </div>
          </div>
          <Typography variant='btn' color='secondary'>
            {data?.description}
          </Typography>
          <div className='mt-5 flex justify-end gap-3'>
            <Button
              variant='outline'
              className='text-danger-500'
              onClick={() => setOpen(false)}
            >
              Tutup
            </Button>
            <Button
              variant='danger'
              className='border-none'
              isLoading={isPending}
              onClick={() => handleDelete()}
            >
              Hapus
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
