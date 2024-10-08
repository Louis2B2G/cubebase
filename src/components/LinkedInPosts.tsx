import React from 'react';
import { LinkedInPost } from '@/types/types'; // Adjust this import path as needed

interface LinkedInPostsProps {
  posts: LinkedInPost[];
}

const LinkedInPosts: React.FC<LinkedInPostsProps> = ({ posts }) => {
  // Define the maximum length for post content before truncation
  const MAX_CONTENT_LENGTH = 100;

  // Function to truncate content and add ellipsis
  const truncateContent = (content: string) => {
    if (content.length <= MAX_CONTENT_LENGTH) return content;
    return content.slice(0, MAX_CONTENT_LENGTH) + '...';
  };

  return (
    <div className="space-y-3">
      {posts.map((post, index) => (
        <div key={index} className="bg-gray-50 p-1.5 rounded-md">
          <p className="text-gray-600 mb-1 text-xs">{post.date}</p>
          <p className="text-xs">{truncateContent(post.content)}</p>
          {post.content.length > MAX_CONTENT_LENGTH && (
            <a
              href={post.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-1 inline-block text-xs"
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