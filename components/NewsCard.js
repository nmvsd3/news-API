
import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <img src={article.urlToImage} alt={article.title} className="news-image" />
      <div className="news-content">
        
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">{article.description}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
