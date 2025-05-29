// src/components/Filters.tsx
import React from 'react';

interface FiltersProps {
  name: string;
  onNameChange: (value: string) => void;
  categories: string[];
  onCategoriesChange: (cats: string[]) => void;
  stock: 'ALL' | 'IN' | 'OUT';
  onStockChange: (s: 'ALL'|'IN'|'OUT') => void;
  onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  name,
  onNameChange,
  categories,
  onCategoriesChange,
  stock,
  onStockChange,
  onClear
}) => (
  <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-gray-800 dark:text-gray-100 rounded shadow mb-6">
    {/* BUSCAR POR NOMBRE */}
    <div className="flex-1 min-w-[150px]">
      <label htmlFor="filter-name" className="sr-only">Buscar por nombre</label>
      <input
        id="filter-name"
        type="text"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onClear()}  // o en todo caso onSearch si lo retienes por Enter
        placeholder="Buscar por nombre..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    {/* CATEGORÍAS (multi-select) */}
    <div className="min-w-[150px]">
      <label htmlFor="filter-cat" className="sr-only">Categorías</label>
      <select
        id="filter-cat"
        multiple
        value={categories}
        onChange={e => {
          const opts = Array.from(e.target.selectedOptions).map(o => o.value);
          onCategoriesChange(opts);
        }}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1 h-10
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="Food">Food</option>
        <option value="Drink">Drink</option>
        <option value="Muebles">Muebles</option>
        {/* …otras categorías dinámicas */}
      </select>
    </div>

    {/* STOCK */}
    <div className="min-w-[120px]">
      <label htmlFor="filter-stock" className="sr-only">Disponibilidad</label>
      <select
        id="filter-stock"
        value={stock}
        onChange={e => onStockChange(e.target.value as any)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1 h-10
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="ALL">All</option>
        <option value="IN">In Stock</option>
        <option value="OUT">Out of Stock</option>
      </select>
    </div>

    {/* CLEAR */}
    <div className="flex items-center">
      <button
        onClick={onClear}
        className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200
                   px-4 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
      >
        Clear
      </button>
    </div>
  </div>
);

export default Filters;
