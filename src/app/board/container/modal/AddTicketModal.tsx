import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AddTicketFormType } from '@/app/board/hooks/mutation';
import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';
import Modal from '@/components/Modal';
import { SELECT_OPTIONS } from '@/constant/select-options';

type ModalReturnType = {
  openModal: () => void;
};

export default function AddTicketModal({
  refetch,
  status,
  children,
}: {
  refetch: () => void;
  status: string;
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  const methods = useForm<AddTicketFormType>({
    mode: 'onTouched',
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(),
      tags: [],
      status: status,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: AddTicketFormType) => {
    console.log(data);
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
                label='Tag'
                placeholder='Tambah Tag'
                validation={{
                  required: 'Tag tidak boleh kosong',
                }}
              >
                {SELECT_OPTIONS.tags.map((tag) => (
                  <option key={tag.label} value={tag.value}>
                    {tag.label}
                  </option>
                ))}
              </SelectInput>
            </form>
          </FormProvider>
          <div className='mt-5 flex justify-end gap-3'>
            <Button
              variant='outline'
              className='text-success-500'
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button variant='success' className='border-none text-typo-primary'>
              Simpan
            </Button>
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}
