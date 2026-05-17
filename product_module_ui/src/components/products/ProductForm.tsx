import { useState, useEffect } from 'react';
import { type Product, type ProductFormData, type ValidationErrors, CategoryOptions, StatusOptions } from '../../types';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  isEdit?: boolean;
}

const ProductForm = ({ initialData, onSubmit, isEdit = false }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    product_name: '',
    sku: '',
    category: 1,        // Default to Electronics
    stock_quantity: 0,
    unit_price: 0,
    Description: '',     // Capital D to match backend
    status: 1,          // Default to Active
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [categories, setCategories] = useState<typeof CategoryOptions>(CategoryOptions);
  const statuses = StatusOptions;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle numeric fields
    let parsedValue: any = value;
    if (name === 'category' || name === 'status' || name === 'stock_quantity') {
      parsedValue = parseInt(value) || 0;
    } else if (name === 'unit_price') {
      parsedValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.product_name?.trim()) {
      newErrors.product_name = 'Product name is required';
    }
    if (!formData.sku?.trim()) {
      newErrors.sku = 'SKU is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (formData.stock_quantity === undefined || formData.stock_quantity < 0) {
      newErrors.stock_quantity = 'Valid stock quantity is required';
    }
    if (!formData.unit_price || formData.unit_price < 0) {
      newErrors.unit_price = 'Valid unit price is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure data format matches backend expectation
      const submitData = {
        product_name: formData.product_name,
        sku: formData.sku,
        category: formData.category,
        stock_quantity: formData.stock_quantity,
        unit_price: formData.unit_price,
        Description: formData.Description || '',
        status: formData.status
      };
      onSubmit(submitData);
    }
  };

  // Helper to get category name for display
  const getCategoryName = (id: number) => {
    const category = CategoryOptions.find(c => c.id === id);
    return category ? category.name : '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.product_name && (
            <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU *
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="e.g., LOQ_123"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stock_quantity && (
            <p className="text-red-500 text-xs mt-1">{errors.stock_quantity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Price ($) *
          </label>
          <input
            type="number"
            step="0.01"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.unit_price && (
            <p className="text-red-500 text-xs mt-1">{errors.unit_price}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="Description"
            rows={3}
            value={formData.Description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product description (optional)"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEdit ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;