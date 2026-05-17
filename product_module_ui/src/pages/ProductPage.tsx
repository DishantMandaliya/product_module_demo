import { useState, useEffect, useMemo } from 'react';
import type { Product, FilterOptions, ApiResponse } from '../types';
import { productAPI } from '../lib/api';
import ProductList from '../components/products/ProductList';
import SearchFilter from '../components/products/SearchFilter';
import DeleteConfirmModal from '../components/products/DeleteConfirmModel';

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<FilterOptions>({
        searchTerm: '',
        category: '',
        status: ''
    });
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<any[]>([]); // Changed to array of objects
    const [totalCount, setTotalCount] = useState<number>(0);

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response: ApiResponse = await productAPI.getAllProducts(100, 0, filters.searchTerm);
            if (response.success && response.data) {
                console.log("product data:- ", response.data);
                setProducts(response.data);
                setTotalCount(response.data.length);
            } else {
                console.error('Failed to fetch products:', response.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response: ApiResponse = await productAPI.getAllCategories();
            if (response.success && response.data) {
                console.log("getallcategories:- ", response.data);
                // response.data is array of objects with id and category_name
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Filter products locally
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (filters.searchTerm) {
            const search = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.product_name.toLowerCase().includes(search) ||
                    p.sku.toLowerCase().includes(search)
            );
        }

        if (filters.category) {
            // Convert category to number if category in product is number
            const categoryValue = isNaN(Number(filters.category)) ? filters.category : Number(filters.category);
            filtered = filtered.filter((p) => p.category === categoryValue);
        }

        if (filters.status) {
            filtered = filtered.filter((p) => p.status === filters.status);
        }

        return filtered;
    }, [products, filters]);

    const handleDelete = async (id: string) => {
        const productToDelete = products.find((p) => p.productid === id);
        setDeleteProduct(productToDelete || null);
    };

    const confirmDelete = async () => {
        if (deleteProduct) {
            try {
              debugger
              console.log("confirmdelete called :- ");
                const response: ApiResponse = await productAPI.deleteProduct(deleteProduct.productid!);
                if (response.success) {
                    await fetchProducts(); // Refresh the list
                    setDeleteProduct(null);
                } else {
                    console.error('Delete failed:', response.message);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleSearch = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        // If search term changes, fetch from API with search
        if (newFilters.searchTerm !== filters.searchTerm) {
            fetchProducts();
        }
    };

    const statuses = ['Active', 'Inactive', 'Draft'];

    // Transform categories for SearchFilter component (if it expects string[])
    const categoryNames = categories.map(cat => cat.category_name);
    // Or if it expects objects with id and name:
    const categoryOptions = categories.map(cat => ({
        id: cat.id,
        name: cat.category_name
    }));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Management</h1>

            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredProducts.length} of {totalCount} products
            </div>

            <SearchFilter
                onSearch={handleSearch}
                categories={categoryNames} // Pass array of category names
                // OR if SearchFilter expects different format:
                // categories={categoryOptions}
                statuses={statuses}
            />

            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-500">Loading products...</p>
                </div>
            ) : (
                <ProductList products={filteredProducts} onDelete={handleDelete} />
            )}

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