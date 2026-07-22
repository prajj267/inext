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
    'i-NEXT Research Lab at IIT Patna, led by Dr. Arijit Roy, focuses on Internet of Things (IoT), UAV Networks, Sensor-Cloud, and AI-driven systems for healthcare and agriculture.',
  icons: {
    icon: '/images/favicon/ChatGPT Image Jul 22, 2026, 11_31_29 AM.png',
  },
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
