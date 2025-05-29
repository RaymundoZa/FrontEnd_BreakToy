// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { FiFilter, FiChevronDown, FiX } from 'react-icons/fi';

export interface SearchBarProps {
  name: string;
  onNameChange: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (value: string[]) => void;
  availability: 'all' | 'inStock' | 'outOfStock';
  onAvailabilityChange: (value: 'all' | 'inStock' | 'outOfStock') => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  name,
  onNameChange,
  categories,
  selectedCategories,
  onCategoriesChange,
  availability,
  onAvailabilityChange,
  onSearch,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative mb-6">
      {/* Input + Filter Icon */}
      <div className="flex items-center bg-gray-700 dark:bg-gray-800 rounded-md shadow px-3 py-2">
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          placeholder="Buscar por nombre..."
          className="flex-1 bg-transparent text-gray-200 placeholder-gray-400
                     focus:outline-none text-sm"
        />
        <button
          onClick={() => setShowFilters(prev => !prev)}
          className="ml-2 text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle filters"
        >
          {showFilters ? <FiX size={20}/> : <FiFilter size={20}/>}
        </button>
        <FiChevronDown
          className={`ml-2 text-gray-400 transition-transform ${
            showFilters ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {/* Panel de filtros desplegable */}
      {showFilters && (
        <div
          className="absolute z-10 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                     rounded-md shadow-lg mt-2 p-4 space-y-4"
        >
          {/* Categorías */}
          <div>
            <label className="block text-sm font-medium mb-1">Categorías</label>
            <select
              multiple
              value={selectedCategories}
              onChange={e =>
                onCategoriesChange(
                  Array.from(e.target.selectedOptions, o => o.value)
                )
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1
                         bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="block text-sm font-medium mb-1">Disponibilidad</label>
            <select
              value={availability}
              onChange={e =>
                onAvailabilityChange(e.target.value as any)
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1
                         bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="all">All</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Botones Apply / Close */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                onSearch();
                setShowFilters(false);
              }}
              className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
            >
              Apply
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
