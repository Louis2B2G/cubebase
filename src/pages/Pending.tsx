import React, { useState, useEffect, useRef } from 'react';
import { PendingMessage, generatePendingMessages, generateProspects } from '@/types/mockData';
import { Prospect, Action, MessageDetails } from '@/types/types';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import ProspectDetails from '@/components/ProspectDetails';
import {X, Edit2, Send, Check } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Pending: React.FC = () => {
  const [pendingMessages, setPendingMessages] = useState<PendingMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<PendingMessage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [currentProspect, setCurrentProspect] = useState<Prospect | null>(null);
  const [currentActions, setCurrentActions] = useState<Action[]>([]);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = generatePendingMessages();
    const allProspects = generateProspects();
    setPendingMessages(messages);
    setProspects(allProspects);
    setCurrentMessage(messages[0]);
    const currentProspect = allProspects.find(p => p.id === messages[0].prospectId);
    setCurrentProspect(currentProspect || null);
    setCurrentActions(currentProspect?.actions || []);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (currentMessage && editableRef.current) {
      setCurrentMessage({
        ...currentMessage,
        body: editableRef.current.innerText,
      });
    }
  };

  const handleSend = () => {
    if (currentMessage) {
      setPendingMessages((prev) => prev.filter(message => message.id !== currentMessage.id));
      updateCurrentMessageAndProspect(pendingMessages[1] || null);
    }
  };

  const updateCurrentMessageAndProspect = (message: PendingMessage | null) => {
    setCurrentMessage(message);
    if (message) {
      const prospect = prospects.find(p => p.id === message.prospectId);
      setCurrentProspect(prospect || null);
      setCurrentActions(prospect?.actions || []);
    } else {
      setCurrentProspect(null);
      setCurrentActions([]);
    }
  };

  return (
    <div className="h-full bg-[#fcf9f8] p-4 flex">
      <div className="w-1/2 pr-2">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3 bg-[#fff4e4] hover:bg-[#ffe8cc] text-[#fe5000] text-xs font-medium">
            {pendingMessages.length} Messages to Review
          </div>
          <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
            {currentActions.map((action, index) => (
              <div key={index} className="mb-4">
                {action.type === 'Message' ? (
                  <div className={`flex ${action.details?.from === 'Louis' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      action.details?.from === 'Louis' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold">{action.details?.from}</p>
                        {action.details?.origin === 'Linkedin' ? (
                          <FaLinkedin className="text-blue-600 w-4 h-4" />
                        ) : (
                          <MdEmail className="text-gray-600 w-4 h-4" />
                        )}
                      </div>
                      <p className="text-sm">{action.details?.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(action.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500">
                    {action.type} - {new Date(action.timestamp).toLocaleString()}
                  </div>
                )}
              </div>
            ))}
            {currentMessage && (
              <div className="flex justify-end">
                <div className="max-w-[70%] p-3 rounded-lg bg-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">June (Draft)</p>
                    {currentMessage.origin === 'Linkedin' ? (
                      <FaLinkedin className="text-blue-600 w-5 h-5" />
                    ) : (
                      <MdEmail className="text-gray-600 w-5 h-5" />
                    )}
                  </div>
                  {currentMessage.recipient && (
                    <p className="text-sm font-medium mb-2">To: {currentMessage.recipient}</p>
                  )}
                  {currentMessage.subject && (
                    <p className="text-sm font-medium mb-2">Subject: {currentMessage.subject}</p>
                  )}
                  <div
                    ref={editableRef}
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className="text-sm whitespace-pre-wrap outline-none"
                    style={{ minHeight: '1em' }}
                  >
                    {currentMessage.body}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 flex justify-center space-x-3">
            <button
              onClick={() => updateCurrentMessageAndProspect(pendingMessages[1] || null)}
              className="text-[#fe5000] p-2 rounded-full hover:bg-[#fff4e4] transition-colors"
              aria-label="Skip"
            >
              <X className="w-6 h-6" />
            </button>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-white text-[#fe5000] px-4 py-2 text-sm rounded-full hover:bg-[#fff4e4] transition-colors flex items-center"
              >
                <Check className="w-4 h-4 mr-2" />
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-white text-[#fe5000] px-4 py-2 text-sm rounded-full hover:bg-[#fff4e4] transition-colors flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </button>
            )}
            <button
              onClick={handleSend}
              className="bg-[#fe5000] text-white px-4 py-2 text-sm rounded-full hover:bg-[#e64500] transition-colors flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 pl-4 mb-10">
        {currentProspect && <ProspectDetails prospect={currentProspect} />}
      </div>
    </div>
  );
};

export default Pending;