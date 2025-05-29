// src/components/SearchBar.tsx
import React from 'react';
import { FiFilter } from 'react-icons/fi';

export interface SearchBarProps {
  name: string;
  onNameChange: (value: string) => void;
  onFilterClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  name,
  onNameChange,
  onFilterClick,
}) => (
  <div className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6">
    <div className="relative">
      <input
        type="text"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onFilterClick()}
        placeholder="Buscar por nombre..."
        className="
          w-full 
          bg-gray-700 dark:bg-gray-800 
          text-gray-200 placeholder-gray-400 
          rounded-lg 
          pl-4 pr-10 py-2 
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition
        "
      />
      <button
        onClick={onFilterClick}
        className="
          absolute right-3 top-1/2 
          transform -translate-y-1/2 
          text-gray-300 hover:text-white
          focus:outline-none
        "
        aria-label="Open filters"
      >
        <FiFilter size={20} />
      </button>
    </div>
  </div>
);

export default SearchBar;
