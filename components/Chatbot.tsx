'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user', timestamp }]);
    setInput('');
    setLoading(true);

    // Call the Gemini API
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      console.error('Failed to fetch response from Gemini API');
      setLoading(false);
      return;
    }

    const data = await response.json();
    const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { text: data.reply, sender: 'bot', timestamp: botTimestamp }]);
    setLoading(false);
  };

  // Scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-4">AI Chatbot</h1>
      <div id="chat-container" className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-300">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-center ${msg.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
              {msg.sender === 'bot' && (
                <img src="/companion_17115952.png" alt="Bot Avatar" className="w-8 h-8 rounded-full mr-2" />
              )}
              <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                {msg.text}
                <span className="block text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              {msg.sender === 'user' && (
                <img src="/companion_17115952.png" alt="User  Avatar" className="w-8 h-8 rounded-full ml-2" />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start my-2">
            <div className="flex items-center">
              <img src="/companion_17115952.png" alt="Bot Avatar" className="w-8 h-8 rounded-full mr-2" />
              <div className="inline-block p-2 bg-gray-300 text-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className="loader"></div>
                  <span className="ml-2">Typing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-200">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
