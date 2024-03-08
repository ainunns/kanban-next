import '@/styles/global.css';

import type { Metadata } from 'next';

import Providers from '@/app/providers';
import { poppins } from '@/lib/font';

export const metadata: Metadata = {
  title: {
    default: 'Kanban Board',
    template: '%s | Kanban Board',
  },
  description:
    'A board to keep track of projects and tasks. Built with Next.js, Tailwind CSS, React Query by ainunns',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
