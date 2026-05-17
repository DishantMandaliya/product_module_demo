import { Link } from 'react-router-dom';
import { type Product, CategoryMap, StatusMap } from '../../types';

interface ProductListProps {
    products: Product[];
    onDelete: (id: string) => void;
}

const ProductList = ({ products, onDelete }: ProductListProps) => {
  debugger
  console.log("product list function called :- ",products);
    const getStatusColor = (status: number | string) => {
        const statusNum = typeof status === 'number' ? status : parseInt(status as string);
        switch (statusNum) {
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

    const getStatusName = (status: number | string) => {
        const statusNum = typeof status === 'number' ? status : parseInt(status as string);
        return StatusMap[statusNum] || 'Unknown';
    };

    const getCategoryName = (category: number | string) => {
        const categoryNum = typeof category === 'number' ? category : parseInt(category as string);
        return CategoryMap[categoryNum] || 'Other';
    };

    // Helper function to get product ID from different possible field names
    const getProductId = (product: Product): string => {
        return product.productid || product.id || product.product_id || '';
    };

    const handleDeleteClick = (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Delete button clicked for product ID:', productId);
        if (productId) {
            onDelete(productId);
        } else {
            console.error('Invalid product ID for deletion');
        }
    };

    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No products found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SKU
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => {
                            const productId = getProductId(product);
                            if (!productId) {
                                console.warn('Product without ID:', product);
                                return null;
                            }
                            return (
                                <tr key={productId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {product.product_name || product.productName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.sku}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getCategoryName(product.category)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.stock_quantity || product.stockQuantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${product.unit_price || product.unitPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                product.status
                                            )}`}
                                        >
                                            {getStatusName(product.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Link
                                            to={`/products/${productId}`}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/products/edit/${productId}`}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => handleDeleteClick(e, productId)}
                                            className="text-red-600 hover:text-red-900 cursor-pointer"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;