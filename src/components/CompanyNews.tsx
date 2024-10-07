import React from 'react';
import { NewsArticle } from '@/types/types';

interface CompanyNewsProps {
  news: NewsArticle[];
}

const CompanyNews: React.FC<CompanyNewsProps> = ({ news }) => {
  return (
    <div className="space-y-4">
      {news.map((article, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">{article.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{article.date}</p>
          <p className="text-sm">{article.summary}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CompanyNews;