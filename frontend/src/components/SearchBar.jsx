import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  return (
    <div className="search-bar glass">
      <input
        placeholder="Search by title, genre, or language"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => onSearch(search)}>Search</button>
    </div>
  );
};

export default SearchBar;
