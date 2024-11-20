// src/components/NewsFeed.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('Apple'); // Default search query
  const [category, setCategory] = useState(''); // Category filter
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const apiKey = '261da9afb07c487e92d38ece3bd6cb95';
  const pageSize = 10;

  useEffect(() => {
    fetchNews();
  }, [query, category, page]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&from=2024-11-13&sortBy=popularity&pageSize=${pageSize}&page=${page}&category=${category}&apiKey=${apiKey}`
      );
      setNews(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / pageSize));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 for new search
    fetchNews();
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1); // Reset to page 1 for new filter
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="news-feed">
      {/* Search and Filter Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for news..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>

        <select onChange={handleCategoryChange} value={category} className="category-filter">
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </form>

      {/* News Articles and Pagination */}
      {loading ? (
        <p className="loading">Loading news...</p>
      ) : (
        <>
          <div className="news-content">
            {news.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={page === 1} className="pagination-btn">
              Previous
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages} className="pagination-btn">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsFeed;
