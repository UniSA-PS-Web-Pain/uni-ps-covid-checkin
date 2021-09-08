import { Dispatch, SetStateAction, useState } from 'react';
import { searchTypes } from './types';

interface SearchBarProps {
  search: (searchValue: string) => void;
  searchType: string;
  setSearchType: Dispatch<SetStateAction<searchTypes>>;
}

const SearchBar = ({ search, searchType, setSearchType }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as searchTypes)}
        >
          <option value="uid">UID</option>
          <option value="userId">User ID</option>
          <option value="username">Username</option>
          <option value="location">Location</option>
          <option value="locationId">Location ID</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
