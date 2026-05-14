import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types';
import { getStatusColor, formatCurrency } from '../../utils/validation';

interface ProductDetailsProps {
  product: Product | null;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
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
              {product.productName}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">SKU</h3>
            <p className="mt-1 text-gray-900">{product.sku}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-1 text-gray-900">{product.category}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Stock Quantity</h3>
            <p className="mt-1 text-gray-900">{product.stockQuantity} units</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Unit Price</h3>
            <p className="mt-1 text-gray-900">{formatCurrency(product.unitPrice)}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                product.status
              )}`}
            >
              {product.status}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900">
              {product.description || 'No description provided'}
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => navigate(`/products/edit/${product.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;