'use client';
import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';

export default withAuth(BoardContainer, ['user']);
function BoardContainer() {
  return <div>BoardPage</div>;
}
