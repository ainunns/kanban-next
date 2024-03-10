import { useMutation } from '@tanstack/react-query';
import * as React from 'react';

import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/api';

type DeleteMutationType = {
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

export const useDeleteTicketMutation = ({
  id,
  setOpen,
  refetch,
}: DeleteMutationType) => {
  const { mutateAsync: handleDelete, isPending } = useMutationToast<void, void>(
    useMutation({
      mutationFn: async () => {
        await api.delete(`/task/${id}`);
      },
      onSuccess: () => {
        showToast('Ticket berhasil dihapus', SUCCESS_TOAST);
        setOpen(false);
        refetch();
      },
    }),
  );
  return { handleDelete, isPending };
};

export type AddTicketFormType = {
  title: string;
  description: string;
  dueDate: Date;
  tags: string[];
  status: string;
};

type AddTicketMutationType = {
  refetch: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAddTicketMutation = ({
  refetch,
  setOpen,
}: AddTicketMutationType) => {
  const { mutateAsync: handleAdd, isPending } = useMutationToast<
    void,
    AddTicketFormType
  >(
    useMutation({
      mutationFn: async (data) => {
        await api.post('/task', data);
      },
      onSuccess: () => {
        showToast('Ticket berhasil ditambahkan', SUCCESS_TOAST);
        refetch();
        setOpen(false);
      },
    }),
  );
  return { handleAdd, isPending };
};
