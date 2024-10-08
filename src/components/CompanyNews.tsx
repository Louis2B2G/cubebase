import React from 'react';
import { NewsArticle } from '@/types/types';

interface CompanyNewsProps {
  news: NewsArticle[];
}

const CompanyNews: React.FC<CompanyNewsProps> = ({ news }) => {
  return (
    <div className="space-y-3">
      {news.map((article, index) => (
        <div key={index} className="bg-gray-50 p-1.5 rounded-lg">
          <h4 className="font-semibold text-gray-600 mb-1 text-xs">{article.title}</h4>
          <p className="text-gray-600 mb-1 text-xs">{article.date}</p>
          <p className="mb-1 text-xs">{article.summary}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">
            Show more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CompanyNews;