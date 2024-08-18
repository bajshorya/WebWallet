import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div>
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-400 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
