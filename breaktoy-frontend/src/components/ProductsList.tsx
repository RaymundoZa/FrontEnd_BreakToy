// src/components/ProductsList.tsx
import React from 'react';
import type { Product } from '../api/products';
import StockToggle from './StockToggle';

export interface ProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onToggleStock: (id: number, currentlyInStock: boolean) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleStock,
}) => {
  const today = new Date();

  return (
    <div className="bg-gray-800 text-gray-200 dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-700 text-sm text-center">
          <thead className="bg-gray-700 dark:bg-gray-800">
            <tr>
              {['Toggle', 'Name', 'Category', 'Price', 'Expire', 'Stock', 'Actions'].map(h => (
                <th
                  key={h}
                  className="px-4 py-2 font-semibold uppercase tracking-wide text-gray-300 dark:text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {products.map(p => {
              const qty = p.quantityInStock ?? 0;
              const inStock = qty > 0;

              // expiration background
              const expDate = p.expirationDate ? new Date(p.expirationDate) : null;
              const daysLeft = expDate
                ? Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                : null;
              const expBg = expDate
                ? daysLeft! < 0
                  ? 'bg-red-900'
                  : daysLeft! <= 7
                  ? 'bg-red-800'
                  : daysLeft! <= 14
                  ? 'bg-yellow-900'
                  : 'bg-green-900'
                : '';

              // opacity if out of stock
              const offClass = inStock ? '' : 'opacity-50';

              // stock text color
              const qtyText =
                qty < 5 ? 'text-red-400'
                  : qty <= 10 ? 'text-yellow-400'
                  : 'text-green-400';

              return (
                <tr
                  key={p.id}
                  className={`${expBg} ${offClass} hover:bg-gray-700`}
                >
                  <td className="px-4 py-2">
                    <StockToggle
                      id={p.id!}
                      inStock={inStock}
                      onToggle={onToggleStock}
                    />
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">${p.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {p.expirationDate ?? 'N/A'}
                  </td>
                  <td className={`px-4 py-2 font-semibold ${qtyText}`}>
                    {qty}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => onEdit(p)}
                      className="text-blue-300 hover:text-blue-400"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(p.id!)}
                      className="text-red-300 hover:text-red-400"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-4 py-3 bg-gray-700 dark:bg-gray-800 flex justify-center space-x-2">
        <button className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500">‹</button>
        <span className="px-3 py-1 bg-gray-600 rounded">1</span>
        <button className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500">›</button>
      </div>
    </div>
  );
};

export default ProductsList;
