import React, { useState, useEffect } from 'react';
import { generateConversationHistory } from '@/types/mockData';
import { Conversation } from '@/types/types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Conversation[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const history = generateConversationHistory();
    setMessages(history);
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Conversation = {
        id: messages.length + 1,
        sender: 'Louis',
        message: inputValue,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      // Here you would typically send the message to your backend and get a response
      // For now, we'll just simulate a response from June
      setTimeout(() => {
        const juneResponse: Conversation = {
          id: messages.length + 2,
          sender: 'June',
          message: "I'm here to help! What else would you like to know about Wave AI?",
          timestamp: new Date().toISOString(),
        };
        setMessages(prevMessages => [...prevMessages, juneResponse]);
      }, 1000);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender !== 'June' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'June' && (
              <img src="./june.png" alt="June" className="w-8 h-8 rounded-full mr-2 mb-auto" />
            )}
            <div className={`flex flex-col ${message.sender !== 'June' ? 'items-end' : 'items-start'} max-w-[70%]`}>
              {message.sender === 'June' && (
                <span className="text-sm text-gray-600 mb-1">{message.sender}</span>
              )}
              <div className={`rounded-3xl px-4 py-2 ${
                message.sender !== 'June' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}>
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t w-full">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat; 
