import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productAPI } from '../lib/api';
import type { Product, ProductFormData, ApiResponse } from '../types';
import ProductForm from '../components/products/ProductForm';

const EditProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    console.log('Edit Page - Product ID from URL:', id); // Debug

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('Product ID not found');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching product for edit with ID:', id);
                // Use the getProductById API to fetch the specific product
                const response: ApiResponse = await productAPI.getProductById(id);
                console.log('Edit - API Response:', response);
                
                if (response.success && response.data) {
                    setProduct(response.data);
                } else {
                    setError(response.message || 'Product not found');
                }
            } catch (error: any) {
                console.error('Error fetching product for edit:', error);
                if (error.response?.status === 404) {
                    setError(`Product with ID ${id} not found`);
                } else {
                    setError('An error occurred while fetching the product');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (updatedData: ProductFormData) => {
        try {
            console.log('Updating product with ID:', id, updatedData);
            const response: ApiResponse = await productAPI.updateProduct(id!, updatedData);
            if (response.success) {
                navigate('/products');
            } else {
                setError(response.message || 'Failed to update product');
            }
        } catch (error: any) {
            console.error('Error updating product:', error);
            setError(error.response?.data?.message || 'An error occurred while updating the product');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-500">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4 max-w-md mx-auto">
                    <p className="text-red-700">{error}</p>
                </div>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Product not found</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    // Convert Product to ProductFormData format matching your backend
    const initialData: ProductFormData = {
        product_name: product.product_name,
        sku: product.sku,
        category: typeof product.category === 'number' ? product.category : parseInt(product.category as string),
        stock_quantity: product.stock_quantity,
        unit_price: product.unit_price,
        Description: product.Description || product.description || '',
        status: typeof product.status === 'number' ? product.status : parseInt(product.status as string)
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <ProductForm initialData={initialData} onSubmit={handleSubmit} isEdit={true} />
        </div>
    );
};

export default EditProductPage;