import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product, FilterOptions } from '../types';
import { categories, statuses } from '../data/mockProducts';
import ProductList from '../components/products/ProductList';
import SearchFilter from '../components/products/SearchFilter';
import DeleteConfirmModal from '../components/products/DeleteConfirmModel';

const ProductsPage = () => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [filters, setFilters] = useState<FilterOptions>({ 
    searchTerm: '', 
    category: '', 
    status: '' 
  });
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    return filtered;
  }, [products, filters]);

  const handleDelete = (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    setDeleteProduct(productToDelete || null);
  };

  const confirmDelete = () => {
    if (deleteProduct) {
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h1>
      
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <SearchFilter
        onSearch={setFilters}
        categories={categories}
        statuses={statuses}
      />

      <ProductList products={filteredProducts} onDelete={handleDelete} />

      {deleteProduct && (
        <DeleteConfirmModal
          product={deleteProduct}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;