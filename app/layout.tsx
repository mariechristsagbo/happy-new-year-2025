import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'New Year 2025 Celebration',
  description: 'Welcome the new year with joy and celebration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={playfair.className}>{children}</body>
    </html>
  );
}