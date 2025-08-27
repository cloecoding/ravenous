import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ searchYelp }) {
  const [location, setLocation] = useState("US");
  const [keyword, setKeyword] = useState("restaurant");
  const [sort, setSort] = useState("best_match");

  const sortChoices = [
    { id: "best_match", choice: "Best Match" },
    { id: "rating", choice: "Highest Rated" },
    { id: "review_count", choice: "Most Reviewed" }
  ];

  const handleSortChange = (choice) => {
    setSort(choice);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value || "US");
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value || "food");
  };

  // 🔑 Lo centralizamos en handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    searchYelp(keyword, location, sort);
  };

  return (
    // usamos form para que Enter funcione
    <form id="search-bar" onSubmit={handleSubmit}>
      <ul id="sort-options">
        {sortChoices.map((choice) => (
          <li
            key={choice.id}
            value={choice.id}
            onClick={() => handleSortChange(choice.id)}
            className={sort === choice.id ? "active" : ""}
            tabIndex={0} // accesibilidad
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSortChange(choice.id);
              }
            }}
          >
            {choice.choice}
          </li>
        ))}
      </ul>
      <hr />
      <div id="user-input">
        <input
          className="search-input"
          id="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location (ie New York, NY)"
        />
        <input
          className="search-input"
          id="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Keyword (ie Pizza)"
        />
        {/* botón ahora sí type="submit" */}
        <button id="submit" type="submit">
          Let's go!
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
