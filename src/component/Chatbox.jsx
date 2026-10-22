import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="max-w-4xl relative flex items-center mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="w-full bg-black text-white placeholder-gray-500 rounded-lg pl-4 pr-12 py-5 focus:outline-none focus:ring-1 focus:ring-white border border-neutral-800 shadow-md"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2.5 bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:bg-neutral-800 disabled:text-neutral-500 p-1.5 rounded-md transition"
        >
          <svg xmlns="http://www.w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.940 60.83 60.83 0 0 0 18.092-9.623.75.75 0 0 0 0-1.256A60.83 60.83 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
