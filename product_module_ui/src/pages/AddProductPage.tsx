import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { productAPI } from '../lib/api';
import type { ProductFormData, ApiResponse } from '../types';
import ProductForm from '../components/products/ProductForm';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (productData: ProductFormData) => {
        try {
            const response: ApiResponse = await productAPI.addProduct(productData);
            if (response.success) {
                navigate('/products');
            } else {
                setError(response.message || 'Failed to add product');
            }
        } catch (error: any) {
            console.error('Error adding product:', error);
            setError(error.response?.data?.message || 'An error occurred while adding the product');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddProductPage;