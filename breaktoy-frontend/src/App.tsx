// src/App.tsx
import React, { useEffect, useState } from 'react';
import Header from './components/Header';    
import Footer from './components/Footer';    
import ProductsList from './components/ProductsList';
import Metrics from './components/Metrics';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import type { Product, Metrics as MetricsType } from './api/products';
import {
  fetchProducts,
  fetchMetrics,
  createProduct,
  updateProduct,
  deleteProduct,
  markInStock,
  markOutOfStock,
} from './api/products';

const pageSize = 10;

const App: React.FC = () => {
  // —— Dark mode  ——
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // —— Search by name ——
  const [name, setName] = useState<string>('');

  // —— Data & pagination ——
  const [products, setProducts] = useState<Product[]>([]);
  const [metrics, setMetrics] = useState<MetricsType | null>(null);
  const [page, setPage] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const buildFilters = () => ({ name: name || undefined });

  const loadProducts = async () => {
    const res = await fetchProducts({ ...buildFilters(), page, size: pageSize });
    setProducts(res.data);
  };

  const loadMetrics = async () => {
    const res = await fetchMetrics();
    setMetrics(res.data);
  };

  // Extract unique categories
  useEffect(() => {
    setCategories(Array.from(new Set(products.map(p => p.category))));
  }, [products]);

  // Reload on name or page change
  useEffect(() => {
    loadProducts();
    loadMetrics();
  }, [name, page]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header at the top */}
      <Header />

      <main className="flex-grow p-6 bg-gray-900 text-gray-100 transition-colors">
        {/* Optional: Remove the inline header if Header component already includes one */}
        {/* Search bar */}
        <SearchBar
          name={name}
          onNameChange={setName}
          onFilterClick={() => {
            setPage(0);
            loadProducts();
            loadMetrics();
          }}
        />

        {/* New Product button */}
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + New Product
        </button>

        {/* Products list */}
        <ProductsList
          products={products}
          onEdit={p => {
            setEditing(p);
            setShowForm(true);
          }}
          onDelete={async id => {
            await deleteProduct(id);
            loadProducts();
            loadMetrics();
          }}
          onToggleStock={async (id, inStock) => {
            if (inStock) await markOutOfStock(id);
            else await markInStock(id);
            loadProducts();
            loadMetrics();
          }}
        />

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 my-6">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹ Prev
          </button>
          <span>Page {page + 1}</span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={products.length < pageSize}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ›
          </button>
        </div>

        {/* Metrics below the list */}
        {metrics && <Metrics metrics={metrics} />}

        {/* Product form modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start p-4 overflow-auto">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded shadow-lg max-w-md w-full p-6 transition-colors">
              <ProductForm
                initial={editing ?? undefined}
                categories={categories}
                onSubmit={async prod => {
                  if (prod.id) await updateProduct(prod.id, prod);
                  else await createProduct(prod);
                  setShowForm(false);
                  loadProducts();
                  loadMetrics();
                }}
                onClose={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default App;
