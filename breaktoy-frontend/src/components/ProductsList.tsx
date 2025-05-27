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
  return (
    <table className="min-w-full bg-white rounded shadow overflow-hidden mb-4">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-center"><input type="checkbox" disabled /></th>
          <th className="p-2 text-left">Category</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-right">Price</th>
          <th className="p-2 text-center">Expiration Date</th>
          <th className="p-2 text-right">Stock</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => {
          const inStock = (p.quantityInStock ?? 0) > 0;
          return (
            <tr
              key={p.id}
              className={`${!inStock ? 'line-through text-gray-400' : ''}`}
            >
            <td className="p-2 text-center">
              <StockToggle
             id={p.id!}
             inStock={(p.quantityInStock ?? 0) > 0}
             onToggle={onToggleStock}
             /> 
             </td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2 text-right">${p.unitPrice.toFixed(2)}</td>
              <td className="p-2 text-center">
                {p.expirationDate ?? '-'}
              </td>
              <td className="p-2 text-right">{p.quantityInStock}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => onEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id!)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductsList;
