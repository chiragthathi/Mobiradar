import React, { useState } from 'react';
import './SearchComponent.css';

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data); // Assuming data is an array of products
        onSearch(searchTerm); // Pass search term to the parent component
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setSearchResults([]); // Clear search results if the search term is empty
      onSearch(''); // Pass an empty search term to the parent component
    }
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display search results */}
      <div className="card-container">
        {searchResults.length > 0 &&
          searchResults.map(product => (
            <div className="card" style={{ width: '18rem' }} key={product.id}>
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SearchComponent;
