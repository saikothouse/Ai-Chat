import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Chatbot App',
  description: 'An AI chatbot built with Next.js, Tailwind CSS, and Gemini API',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Chatbot App</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        &copy; 2024 Chatbot App. All rights reserved.
      </footer>
    </div>
  );
}
