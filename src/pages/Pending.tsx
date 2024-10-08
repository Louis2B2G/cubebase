import React, { useState, useEffect } from 'react';
import { PendingEmail, generatePendingEmails } from '@/types/mockData';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

const Pending: React.FC = () => {
  const [pendingEmails, setPendingEmails] = useState<PendingEmail[]>([]);
  const [currentEmail, setCurrentEmail] = useState<PendingEmail | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const emails = generatePendingEmails();
    setPendingEmails(emails);
    setCurrentEmail(emails[0]);
  }, []);

  const handleDragEnd = (info: PanInfo) => {
    if (info.offset.x > 100) {
      handleApprove();
    } else if (info.offset.x < -100) {
      handleReject();
    }
  };

  const handleApprove = () => {
    setPendingEmails((prev) => prev.slice(1));
    setCurrentEmail(pendingEmails[1] || null);
  };

  const handleReject = () => {
    setPendingEmails((prev) => prev.slice(1));
    setCurrentEmail(pendingEmails[1] || null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (currentEmail) {
      setCurrentEmail({
        ...currentEmail,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (pendingEmails.length === 0) {
    return (
      <div className="h-full bg-[#fcf9f8] flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-[#fe5000]">All Caught Up!</h1>
          <p className="text-lg text-gray-600 mb-6">
            There are no emails waiting for your review at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#fcf9f8] p-4">
      <h1 className="text-xl font-semibold mb-3 text-black">Pending Approval</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-3 bg-[#fff4e4] hover:bg-[#ffe8cc] text-[#fe5000]  text-xs font-medium">
          Emails to Review: {pendingEmails.length}
        </div>
        <div className="relative h-[calc(100vh-200px)] overflow-hidden">
          <AnimatePresence>
            {currentEmail && (
              <motion.div
                key={currentEmail.id}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                drag={!isEditing ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => handleDragEnd(info)}
                className="absolute top-0 left-0 right-0 p-4 bg-white"
              >
                <div className="mb-2">
                  <div className="text-sm font-semibold text-black">
                    To: {isEditing ? (
                      <input
                        name="recipient"
                        value={currentEmail.recipient}
                        onChange={handleInputChange}
                        className="border-b border-[#0077be] focus:outline-none"
                      />
                    ) : currentEmail.recipient}
                  </div>
                  <div className="text-sm font-medium text-black">
                    Subject: {isEditing ? (
                      <input
                        name="subject"
                        value={currentEmail.subject}
                        onChange={handleInputChange}
                        className="border-b border-[#0077be] focus:outline-none"
                      />
                    ) : currentEmail.subject}
                  </div>
                </div>
                <div className="h-[calc(100vh-300px)] mt-4 overflow-y-auto">
                  {isEditing ? (
                    <textarea
                      name="body"
                      value={currentEmail.body}
                      onChange={handleInputChange}
                      className="w-full h-full text-sm text-black resize-none focus:outline-none"
                    />
                  ) : (
                    <p className="text-sm text-black whitespace-pre-wrap">{currentEmail.body}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-4 flex justify-center space-x-3">
          <button
            onClick={handleReject}
            className="text-[#fe5000] p-2 rounded-full hover:bg-[#fff4e4] transition-colors"
            aria-label="Reject"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 text-sm rounded-full hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-white text-[#fe5000] px-4 py-2 text-sm rounded-full hover:bg-[#fff4e4] transition-colors"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleApprove}
            className="text-[#fe5000] p-2 rounded-full hover:bg-[#fff4e4] transition-colors"
            aria-label="Approve"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pending;