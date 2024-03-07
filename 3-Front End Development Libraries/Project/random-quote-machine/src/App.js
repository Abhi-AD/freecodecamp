import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div id="quote-box">
      <div id="quote-text">
        <i className="fas fa-quote-left"></i>
        <span id="text">"{quote}"</span>
      </div>
      <div id="quote-author">- {author}</div>
      <div id="quote-buttons">
        <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i> Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default App;
