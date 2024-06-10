import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './locationSearch.css';

const LocationSearch = ({ onSearch }) => {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/location/?name=${query}`);
          setSuggestions(response.data.results);
          setShowSuggestions(true);
          setError(null);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setSuggestions([]);
            setError(' ❌ No matches found ❌ ');
          } else {
            console.error(error);
            setError('An error occurred while fetching data');
          }
          setShowSuggestions(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setError(null);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    onSearch(suggestion.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      onSearch(suggestions[0].id);
    }
  };


  return (
    <div className="search-input">
      <form onSubmit={handleSubmit} className="search-input__form">
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          className="search-input__input"
          placeholder="Search location here 👽"
        />
        <button type="submit" className="search-input__button">Search</button>
      </form>
      {
        error && 
          <div className="search-input__suggestions-error">
            <span className="search-input__error">{error}</span>
            <span className='search-input__error'>Please, try with other words.</span>
          </div>
      }
      {
        showSuggestions && (
          <ul className="search-input__suggestions">
            {
              suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="search-input__suggestion-item"
                >
                  {suggestion.name}
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}

export default LocationSearch
