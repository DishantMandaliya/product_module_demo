export interface Product {
  id: string;
  productName: string;
  sku: string;
  category: string;
  stockQuantity: number;
  unitPrice: number;
  description: string;
  status: 'Active' | 'Inactive' | 'Draft';
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  productName: string;
  sku: string;
  category: string;
  stockQuantity: number;
  unitPrice: number;
  description: string;
  status: 'Active' | 'Inactive' | 'Draft';
}

export interface ValidationErrors {
  productName?: string;
  sku?: string;
  category?: string;
  stockQuantity?: string;
  unitPrice?: string;
  status?: string;
  description?: string;
}

export interface FilterOptions {
  searchTerm: string;
  category: string;
  status: string;
}

export interface Stats {
  totalProducts: number;
  totalStock: number;
  totalValue: number;
  activeProducts: number;
}