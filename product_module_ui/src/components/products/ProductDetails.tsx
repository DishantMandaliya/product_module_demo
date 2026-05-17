import { useNavigate } from 'react-router-dom';
import { type Product, CategoryMap, StatusMap } from '../../types';

interface ProductDetailsProps {
    product: Product | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const navigate = useNavigate();

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case 1:
                return 'bg-green-100 text-green-800';
            case 2:
                return 'bg-red-100 text-red-800';
            case 3:
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusName = (status: number) => {
        return StatusMap[status] || 'Unknown';
    };

    const getCategoryName = (category: number) => {
        return CategoryMap[category] || 'Other';
    };

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Product not found</p>
                <button
                    onClick={() => navigate('/products')}
                    className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                    Back to List
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Product Name</h3>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {product.product_name}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                        <p className="mt-1 text-gray-900">{product.sku}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Category</h3>
                        <p className="mt-1 text-gray-900">{getCategoryName(product.category_name)}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Stock Quantity</h3>
                        <p className="mt-1 text-gray-900">
                            <span className="font-semibold">{product.stock_quantity}</span> units
                            {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                                <span className="ml-2 text-yellow-600 text-sm">(Low Stock)</span>
                            )}
                            {product.stock_quantity === 0 && (
                                <span className="ml-2 text-red-600 text-sm">(Out of Stock)</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Unit Price</h3>
                        <p className="mt-1 text-gray-900">
                            <span className="font-semibold text-lg">{formatCurrency(product.unit_price)}</span>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                product.status
                            )}`}
                        >
                            {getStatusName(product.status)}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                            <p className="text-gray-700">
                                {product.Description || product.description || 'No description provided'}
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={() => navigate(`/products/edit/${product.product_id}`)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Edit Product
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {/* Additional Information Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {product.created_at && (
                        <div>
                            <span className="text-gray-500">Created Date:</span>
                            <span className="ml-2 text-gray-700">
                                {new Date(product.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    {product.updated_at && (
                        <div>
                            <span className="text-gray-500">Last Updated:</span>
                            <span className="ml-2 text-gray-700">
                                {new Date(product.updated_at).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                    <div>
                        <span className="text-gray-500">Total Value:</span>
                        <span className="ml-2 text-gray-700 font-semibold">
                            {formatCurrency(product.stock_quantity * product.unit_price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;