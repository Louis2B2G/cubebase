import React, { useState } from 'react';
import { LinkedInPost } from '@/types/types'; // Adjust this import path as needed

interface LinkedInPostsProps {
  posts: LinkedInPost[];
}

const LinkedInPosts: React.FC<LinkedInPostsProps> = ({ posts }) => {
  // Define the maximum length for post content before truncation
  const MAX_CONTENT_LENGTH = 150;

  // Function to truncate content and add ellipsis
  const truncateContent = (content: string) => {
    if (content.length <= MAX_CONTENT_LENGTH) return content;
    return content.slice(0, MAX_CONTENT_LENGTH) + '...';
  };

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">{post.date}</p>
          <p>{truncateContent(post.content)}</p>
          {post.content.length > MAX_CONTENT_LENGTH && (
            <a
              href={post.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Show more
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default LinkedInPosts;