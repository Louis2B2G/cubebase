import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Conversation, Prospect } from '@/types/types';

interface ConversationsProps {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  prospects: Prospect[]; // Add this line
}

const Conversations: React.FC<ConversationsProps> = ({ conversations, setConversations, prospects }) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState<string>('');

  const sendMessage = () => {
    if (message.trim() && selectedConversation) {
      const updatedConversations = conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? {...conv, lastMessage: message, date: new Date().toISOString().split('T')[0]}
          : conv
      );
      setConversations(updatedConversations);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full">
      {/* Conversation List */}
      <div className="w-1/3 bg-white rounded-lg shadow mr-4 overflow-auto">
        <h2 className="text-2xl font-bold p-4 border-b">Conversations</h2>
        {conversations.map(conv => {
          const prospect = prospects.find(p => p.name === conv.prospect);
          return (
            <div 
              key={conv.id} 
              className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${selectedConversation?.id === conv.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={prospect?.avatar || '/default-avatar.png'} 
                    alt={conv.prospect} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{conv.prospect}</h3>
                    <p className="text-sm text-gray-600">{conv.company}</p>
                  </div>
                </div>
                {prospect && (
                  <div className="flex-shrink-0">
                    {prospect.reachedOn === 'linkedin' ? (
                      <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 truncate">{conv.lastMessage}</p>
              <p className="text-xs text-gray-400 mt-1">{conv.date}</p>
            </div>
          );
        })}
      </div>

      {/* Conversation Detail */}
      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b">
              <h3 className="font-semibold">{selectedConversation.prospect}</h3>
              <p className="text-sm text-gray-600">{selectedConversation.company}</p>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              {/* Conversation messages would go here */}
              <p className="bg-gray-100 p-3 rounded-lg inline-block">{selectedConversation.message}</p>
            </div>
            <div className="p-4 border-t flex">
              <input 
                type="text" 
                className="flex-1 border rounded-l-lg px-4 py-2" 
                placeholder="Type a message..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                onClick={sendMessage}
              >
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;