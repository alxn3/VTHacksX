'use client';

import { ThemeProvider } from 'next-themes';
import { Raleway } from '@next/font/google';
import '@styles/globals.css';

const raleway = Raleway({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={raleway.className}>
      <head></head>
      <ThemeProvider attribute="class">
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
