'use client';
import { useQuery } from '@tanstack/react-query';

import { ApiResponse } from '@/types/api';
import { tasksType } from '@/types/entities/task';

export const useGetTickets = () => {
  const {
    data: boardData,
    isPending: isLoading,
    refetch,
  } = useQuery<ApiResponse<tasksType>>({
    queryKey: ['/task'],
  });
  return { boardData, isLoading, refetch };
};
