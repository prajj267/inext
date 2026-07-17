import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'i-NEXT',
    template: 'i-NEXT | %s',
  },
  description:
    'i-NEXT is a research lab at IIT Patna working on machine learning, ' +
    'computer vision, and natural language processing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
