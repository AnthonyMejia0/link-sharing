import type { Metadata } from 'next';
import { Instrument_Sans, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { LinksProvider } from '@/context/LinkContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const instrumentSans = Instrument_Sans({
  variable: '--font-inst-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'devlinks',
  description:
    'Devlinks is a simple, customizable link-sharing platform that lets you collect and showcase all your social media profiles and online content in one place. Create a personalized profile page, add your favorite links, and share a single URL with others so they can easily find everything you do online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        instrumentSans.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-grey-50">
        <AuthProvider>
          <LinksProvider>{children}</LinksProvider>
        </AuthProvider>
        <Toaster
          position="top-right"
          closeButton
          toastOptions={{
            classNames: {
              error: 'bg-red-500! text-white!',
            },
          }}
        />
      </body>
    </html>
  );
}
