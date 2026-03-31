import '@/components/global.css';

import { SpeedInsights } from '@vercel/speed-insights/next';

import { inter } from '@/components/fonts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
