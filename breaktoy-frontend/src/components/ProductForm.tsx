// src/components/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import type { Product } from '../api/products';

export interface ProductFormProps {
  initial?: Product;
  categories: string[];
  onSubmit: (product: Product) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initial,
  categories,
  onSubmit,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unitPrice, setUnitPrice] = useState<number | ''>('');
  const [quantityInStock, setQuantityInStock] = useState<number | ''>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initial) {
      setName(initial.name || '');
      setCategory(initial.category || '');
      setUnitPrice(initial.unitPrice ?? '');
      setQuantityInStock(initial.quantityInStock ?? '');
      setExpirationDate(initial.expirationDate ?? '');
    }
  }, [initial]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!category) e.category = 'Category is required';
    if (unitPrice === '' || unitPrice < 0) e.unitPrice = 'Price must be ≥ 0';
    if (quantityInStock === '' || quantityInStock < 0)
      e.quantityInStock = 'Quantity must be ≥ 0';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit({
      ...(initial ?? {}),
      name: name.trim(),
      category,
      unitPrice: Number(unitPrice),
      quantityInStock: Number(quantityInStock),
      expirationDate: expirationDate || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 overflow-auto">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6 transition-colors">
        <h2 className="text-xl font-bold mb-4">
          {initial ? 'Edit Product' : 'New Product'}
        </h2>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="
                w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="
                w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Type a category"
              className="
                mt-1 w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
            <small className="text-gray-500 dark:text-gray-400">
              Puedes escribir una categoría nueva o usar una existente.
            </small>
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Unit Price */}
          <div>
            <label className="block mb-1 font-medium">Unit Price</label>
            <input
              type="number"
              step="0.01"
              value={unitPrice}
              onChange={e => setUnitPrice(e.target.valueAsNumber)}
              className="
                w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
            {errors.unitPrice && (
              <p className="text-red-600 text-sm">{errors.unitPrice}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity In Stock</label>
            <input
              type="number"
              value={quantityInStock}
              onChange={e => setQuantityInStock(e.target.valueAsNumber)}
              className="
                w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
            {errors.quantityInStock && (
              <p className="text-red-600 text-sm">
                {errors.quantityInStock}
              </p>
            )}
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block mb-1 font-medium">Expiration Date</label>
            <input
              type="date"
              value={expirationDate}
              onChange={e => setExpirationDate(e.target.value)}
              className="
                w-full border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="
              px-4 py-2 border border-gray-300 dark:border-gray-600
              rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition
            "
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="
              px-4 py-2 bg-green-600 text-white rounded
              hover:bg-green-700 transition
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
