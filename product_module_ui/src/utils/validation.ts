import type { ProductFormData, ValidationErrors } from '../types';

export const validateProduct = (product: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!product.product_name?.trim()) {
    errors.product_name = 'Product name is required';
  } else if (product.product_name.length < 2) {
    errors.product_name = 'Product name must be at least 2 characters';
  }

  if (!product.sku?.trim()) {
    errors.sku = 'SKU is required';
  } else if (!/^[A-Z0-9-]+$/i.test(product.sku)) {
    errors.sku = 'SKU must contain only letters, numbers, and hyphens';
  }

  if (!product.category) {
    errors.category = 'Category is required';
  }

  if (product.stock_quantity === undefined || product.stock_quantity === null) {
    errors.stock_quantity = 'Stock quantity is required';
  } else if (isNaN(product.stock_quantity) || product.stock_quantity < 0) {
    errors.stock_quantity = 'Stock quantity must be a non-negative number';
  }

  if (!product.unit_price) {
    errors.unit_price = 'Unit price is required';
  } else if (isNaN(product.unit_price) || product.unit_price < 0) {
    errors.unit_price = 'Unit price must be a non-negative number';
  }

  if (!product.status) {
    errors.status = 'Status is required';
  }

  return errors;
};

export const formatCurrency = (amount: number): string => {
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Check if it's a valid number
  if (isNaN(numAmount) || numAmount === undefined || numAmount === null) {
    return '$0.00';
  }
  
  return `$${numAmount.toFixed(2)}`;
};
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
      return 'bg-red-100 text-red-800';
    case 'Draft':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};