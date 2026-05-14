import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    productName: 'MacBook Pro 14"',
    sku: 'MBP-14-2024',
    category: 'Electronics',
    stockQuantity: 45,
    unitPrice: 1999.99,
    description: 'Apple M3 Pro chip, 16GB RAM, 512GB SSD, Space Gray',
    status: 'Active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    productName: 'Ergonomic Office Chair',
    sku: 'CHAIR-ERG-01',
    category: 'Furniture',
    stockQuantity: 32,
    unitPrice: 349.99,
    description: 'Adjustable lumbar support, breathable mesh, headrest included',
    status: 'Active',
    createdAt: '2024-01-20T11:30:00Z'
  },
  {
    id: '3',
    productName: 'Wireless Mechanical Keyboard',
    sku: 'KB-MECH-WL',
    category: 'Electronics',
    stockQuantity: 78,
    unitPrice: 159.99,
    description: 'RGB backlit, hot-swappable switches, Bluetooth 5.0',
    status: 'Active',
    createdAt: '2024-02-01T09:15:00Z'
  },
  {
    id: '4',
    productName: 'Cotton Casual Shirt',
    sku: 'SHIRT-COT-101',
    category: 'Clothing',
    stockQuantity: 150,
    unitPrice: 39.99,
    description: '100% premium cotton, regular fit, available in multiple colors',
    status: 'Active',
    createdAt: '2024-02-10T14:20:00Z'
  },
  {
    id: '5',
    productName: 'Standing Desk',
    sku: 'DESK-STD-48',
    category: 'Furniture',
    stockQuantity: 18,
    unitPrice: 499.99,
    description: 'Electric height adjustable, 48" width, memory presets',
    status: 'Inactive',
    createdAt: '2024-01-25T08:45:00Z'
  },
  {
    id: '6',
    productName: 'The Great Gatsby',
    sku: 'BOOK-FIC-001',
    category: 'Books',
    stockQuantity: 200,
    unitPrice: 14.99,
    description: 'Classic American literature, paperback edition',
    status: 'Active',
    createdAt: '2024-02-15T16:30:00Z'
  },
  {
    id: '7',
    productName: 'Noise Cancelling Headphones',
    sku: 'AUDIO-NC-77',
    category: 'Electronics',
    stockQuantity: 0,
    unitPrice: 299.99,
    description: 'Active noise cancellation, 30hr battery life, premium sound',
    status: 'Draft',
    createdAt: '2024-02-20T12:00:00Z'
  },
  {
    id: '8',
    productName: 'Yoga Mat',
    sku: 'SPORT-YOGA-88',
    category: 'Other',
    stockQuantity: 95,
    unitPrice: 29.99,
    description: 'Eco-friendly TPE material, non-slip surface, 6mm thickness',
    status: 'Active',
    createdAt: '2024-02-22T10:15:00Z'
  }
];

// Categories for filter
export const categories = ['Electronics', 'Clothing', 'Furniture', 'Books', 'Other'];

// Statuses for filter
export const statuses = ['Active', 'Inactive', 'Draft'];