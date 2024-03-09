import { Metadata } from 'next';
import * as React from 'react';

import BoardContainer from '@/app/board/container/BoardPage';

export const metadata: Metadata = {
  title: 'Home',
};
export default function BoardPage() {
  return <BoardContainer />;
}
