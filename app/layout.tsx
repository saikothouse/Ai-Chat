import type { Metadata } from 'next';
import './globals.css'; // Import your global CSS file
import { ReactNode } from 'react';

export const metadata = {
  title: 'Gemini AI Chatbot',
  description: 'AI Chatbot using Gemini API',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;
