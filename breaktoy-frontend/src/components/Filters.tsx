// src/components/Filters.tsx
import React, { useState } from 'react';

export interface FiltersProps {
  /** Lista de categorías disponibles */
  categories: string[];
  /** Llama con { name?, category?, inStock? } */
  onSearch: (filters: {
    name?: string;
    category?: string[];
    inStock?: boolean;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, onSearch }) => {
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  const handleSearch = () => {
    onSearch({
      name: name.trim() || undefined,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      inStock:
        availability === 'all'
          ? undefined
          : availability === 'inStock'
          ? true
          : false,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-4 gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Category multiselect */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          multiple
          value={selectedCategories}
          onChange={e =>
            setSelectedCategories(
              Array.from(e.target.selectedOptions).map(o => o.value)
            )
          }
          className="border p-2 rounded w-full h-20"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium mb-1">Availability</label>
        <select
          value={availability}
          onChange={e => setAvailability(e.target.value as any)}
          className="border p-2 rounded w-full"
        >
          <option value="all">All</option>
          <option value="inStock">In stock</option>
          <option value="outOfStock">Out of stock</option>
        </select>
      </div>

      {/* Search button */}
      <div className="self-end">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
