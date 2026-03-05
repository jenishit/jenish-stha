import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Jenish Robotics Lab',
  description: 'Explore the digital robotics laboratory of engineer Jenish',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F1A] text-[#E5E7EB]">
        {children}
      </body>
    </html>
  );
}
