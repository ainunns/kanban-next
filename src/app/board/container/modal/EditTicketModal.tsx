import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  TicketFormType,
  useEditTicketMutation,
} from '@/app/board/hooks/mutation';
import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';
import Modal from '@/components/Modal';
import { SELECT_OPTIONS } from '@/constant/select-options';
import { taskType } from '@/types/entities/task';

type ModalReturnType = {
  openModal: () => void;
};

export default function EditTicketModal({
  refetch,
  data,
  children,
}: {
  refetch: () => void;
  data: taskType | null;
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const methods = useForm<TicketFormType>({
    mode: 'onTouched',
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      dueDate: data?.dueDate || new Date(),
      tags: data?.tags || [],
      status: data?.status,
    },
  });

  const { handleSubmit } = methods;

  const { handleEdit, isPending } = useEditTicketMutation({
    refetch,
    setOpen,
    id: data?._id || '',
  });

  const onSubmit = (data: TicketFormType) => {
    handleEdit(data);
  };

  return (
    <>
      {children(modalReturn)}
      <Modal
        open={open}
        setOpen={setOpen}
        title='Tambah Ticket Baru'
        titleClassName='font-semibold'
      >
        <Modal.Section className='flex flex-col gap-4'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-3'
            >
              <Input
                id='title'
                label='Judul'
                placeholder='Masukkan judul ticket'
                validation={{
                  required: 'Judul tidak boleh kosong',
                }}
              />
              <TextArea
                id='description'
                label='Deskripsi'
                placeholder='Masukkan deskripsi ticket'
                validation={{
                  required: 'Deskripsi tidak boleh kosong',
                  maxLength: {
                    value: 255,
                    message: 'Deskripsi tidak boleh lebih dari 255 karakter',
                  },
                }}
              />
              <DatePicker
                id='dueDate'
                label='Batas Waktu'
                placeholder='Pilih batas waktu'
                validation={{
                  required: 'Batas waktu tidak boleh kosong',
                }}
              />
              <SelectInput
                id='tags'
                label='Tags'
                options={SELECT_OPTIONS.tags}
                isMulti={true}
                placeholder='Tambah tag'
                validation={{
                  required: 'Tag tidak boleh kosong',
                }}
              />
              <div className='mt-5 flex justify-end gap-3'>
                <Button
                  variant='outline'
                  className='text-success-500'
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type='submit'
                  variant='success'
                  className='border-none text-typo-primary'
                  isLoading={isPending}
                >
                  Simpan
                </Button>
              </div>
            </form>
          </FormProvider>
        </Modal.Section>
      </Modal>
    </>
  );
}
