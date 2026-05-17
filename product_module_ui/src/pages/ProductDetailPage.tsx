import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { productAPI } from '../lib/api';
import type { Product, ApiResponse } from '../types';
import ProductDetails from '../components/products/ProductDetails';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('Product ID not found');
                setLoading(false);
                return;
            }

            try {
                // Using your dedicated getProductById endpoint
                const response: ApiResponse = await productAPI.getProductById(id);
                
                if (response.success && response.data) {
                    setProduct(response.data);
                } else {
                    setError(response.message || 'Product not found');
                }
            } catch (error: any) {
                console.error('Error fetching product:', error);
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

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-500">Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-4 max-w-md mx-auto">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-2xl">⚠️</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
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
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4 max-w-md mx-auto">
                    <p className="text-yellow-700">No product data available</p>
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

    return <ProductDetails product={product} />;
};

export default ProductDetailPage;