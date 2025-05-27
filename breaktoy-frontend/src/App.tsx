// src/App.tsx
import React, { useEffect, useState } from 'react';
import Filters from './components/Filters';
import ProductsList from './components/ProductsList';
import Metrics from './components/Metrics';
import ProductForm from './components/ProductForm';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [metrics, setMetrics] = useState<MetricsType | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Carga productos según filtros y página
  const loadProducts = async () => {
    const res = await fetchProducts({ ...filters, page, size: pageSize });
    setProducts(res.data);
  };

  // Carga métricas
  const loadMetrics = async () => {
    const res = await fetchMetrics();
    setMetrics(res.data);
  };

  // Extrae categorías únicas desde los productos actuales
  useEffect(() => {
    setCategories(Array.from(new Set(products.map(p => p.category))));
  }, [products]);

  // Inicializa carga y recarga en filtros/página
  useEffect(() => {
    loadProducts();
    loadMetrics();
  }, [filters, page]);

  return (
    <div className="p-4 min-h-screen overflow-auto">
      {/* FILTROS */}
      <Filters
        categories={categories}
        onSearch={f => {
          setFilters(f);
          setPage(0);
        }}
      />

      {/* BOTÓN NUEVO PRODUCTO */}
      <button
        onClick={() => {
          setEditing(null);
          setShowForm(true);
        }}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        New Product
      </button>

      {/* MÉTRICAS */}
      {metrics && <Metrics metrics={metrics} />}

      {/* LISTADO DE PRODUCTOS */}
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

      {/* PAGINACIÓN */}
      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page + 1}</span>
        <button
          onClick={() => setPage(prev => prev + 1)}
          disabled={products.length < pageSize}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MODAL DE FORMULARIO */}
{showForm && (
  <div
    className="
      fixed inset-0 z-50 
      bg-black bg-opacity-50 
      flex justify-center items-start 
      overflow-auto p-4
    "
  >
    <div className="bg-white rounded shadow-lg max-w-lg w-full">
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

    </div>
  );
};

export default App;
