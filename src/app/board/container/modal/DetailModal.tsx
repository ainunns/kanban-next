import * as React from 'react';
import { FaCalendar } from 'react-icons/fa';
import { GrStatusGood } from 'react-icons/gr';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { PiLinkSimpleBold } from 'react-icons/pi';

import Button from '@/components/buttons/Button';
import Chips from '@/components/Chips';
import UnderlineLink from '@/components/links/UnderlineLink';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import { randomColor, showFormattedDate } from '@/lib/helper';
import { taskType } from '@/types/entities/task';

type ModalReturnType = {
  openModal: () => void;
};

export default function DetailModal({
  data,
  children,
}: {
  data: taskType | null;
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

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
          <Typography variant='btn'>{data?.description ?? ''}</Typography>
          <div className='flex flex-col gap-1.5'>
            <Typography variant='p' weight='semibold'>
              Attachment Link
            </Typography>
            {data?.attachments.map((links) => (
              <div className='flex flex-row items-center gap-1' key={links._id}>
                <PiLinkSimpleBold className='size-4 text-typo-primary' />
                <UnderlineLink href={links.link} openNewTab={true}>
                  <Typography variant='c1' weight='regular'>
                    {links.link}
                  </Typography>
                </UnderlineLink>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-1.5'>
            <Typography variant='p' weight='semibold'>
              Checklist
            </Typography>
            {data?.checklists.map((check) => (
              <div className='flex flex-row items-center gap-1' key={check._id}>
                {check.isDone ? (
                  <MdCheckBoxOutlineBlank className='size-4 text-typo-primary' />
                ) : (
                  <MdCheckBox className='size-4 text-typo-primary' />
                )}
                <Typography variant='c1' weight='regular'>
                  {check.checklistItem}
                </Typography>
              </div>
            ))}
          </div>
          <div className='mt-5 flex justify-end gap-3'>
            <Button
              variant='outline'
              className='text-danger-500'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='danger'
              className='border-none'
              onClick={() => setOpen(false)}
            >
              Delete
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
